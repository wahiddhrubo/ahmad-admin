import { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import TableDropdown from "./TableDropdown.js";

import Alert from "../layout/alert.js";

import { useSelector, useDispatch } from "react-redux";
import {
	getAllProduct,
	deleteProduct,
	productReducer,
} from "../../actions/products";

import { DELETE_PRODUCT_RESET } from "../../constants/products.js";

import styles from "./Products.module.css";

export default function Products({ history }) {
	const dispatch = useDispatch();
	const [searchParams, setSearchParams] = useSearchParams();

	const [showAlert, setShowAlert] = useState(false);
	const [alertType, setAlertType] = useState();
	const [alertMessage, setAlertMessage] = useState();
	const [searchText, setSearchText] = useState("");

	const triggerAlert = (type, message) => {
		setShowAlert(true);
		setAlertType(type);
		setAlertMessage(message);
	};

	const {
		loading,
		products,
		productsCount,
		resultPerPage,
		totalPages,
		error,
	} = useSelector((state) => state.allProducts);
	const { isDeleted } = useSelector((state) => state.productReducer);

	useEffect(() => {
		const page = searchParams.get("page") || 1;
		const limit = searchParams.get("limit") || 50;
		const keyword = searchParams.get("keyword") || "";

		const fetchDta = async () => {
			dispatch(
				getAllProduct({
					page: page,
					resultPerPage: limit,
					keyword: keyword,
				})
			);
		};

		fetchDta();
		if (isDeleted) {
			dispatch({ type: DELETE_PRODUCT_RESET });
			triggerAlert("success", "Product Removed Successfully");
		}
	}, [isDeleted, searchParams]);

	const searchHandler = () => {
		searchParams.set("keyword", searchText);
		setSearchParams(searchParams);
	};

	return (
		<div>
			{showAlert ? (
				<Alert
					type={alertType}
					setIsShow={setShowAlert}
					isShow={showAlert}
					message={alertMessage}
				/>
			) : (
				""
			)}

			<div className={styles.wrapper}>
				<div className={styles.header}>
					<div className={styles.titleDiv}>
						<div className={styles.titleContainer}>
							<h3 className={styles.title}>Products</h3>
							<Link
								to="products/new"
								style={{ textDecoration: "none" }}
							>
								<div className={styles.addNewBtn}>
									Add Product
								</div>
							</Link>
							<div className={styles.searchDiv}>
								<input
									type="text"
									name="Search"
									className={styles.input}
									placeholder="Search..."
									onChange={(e) =>
										setSearchText(e.target.value)
									}
									id="Search"
								/>
								<button
									onClick={searchHandler}
									className={styles.search}
								>
									Search
								</button>
							</div>
						</div>
					</div>
				</div>
				<div className={styles.tableDiv}>
					{/* Projects table */}
					<table className={styles.table}>
						<thead className={styles.tableHeaderRow}>
							<tr>
								<th className={styles.tableHeader}>Name</th>
								<th className={styles.tableHeader}>Stock</th>
								<th className={styles.tableHeader}>Price</th>
								<th className={styles.tableHeader}>
									Categories
								</th>
								<th className={styles.tableHeader}>Tags</th>
								<th className={styles.tableHeader}></th>
							</tr>
						</thead>
						<tbody>
							{products?.map((p) => (
								<tr>
									<th className={styles.productName}>
										<span
											className={styles.productNameSpan}
										>
											{p.name}
										</span>
									</th>
									<td className={styles.tableData}>
										{p.stock}
									</td>
									<td className={styles.tableData}>
										{p.discountedPrice ? (
											<span>
												{p.discountedPrice}
												&nbsp;&nbsp;&nbsp;
												<del> {p.price} </del>
											</span>
										) : (
											p.price
										)}
									</td>
									<td className={styles.tableData}>
										{p.categories}
									</td>
									<td className={styles.tableData}>
										{p.tags}
									</td>
									<td className={styles.tableAction}>
										<TableDropdown id={p._id} />
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			</div>
		</div>
	);
}
