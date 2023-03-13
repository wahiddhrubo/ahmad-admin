import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import ReactQuill from "react-quill";

import GalleryForm from "./galleryForm.js";
import FeaturedImageForm from "./featuredForm.js";
import SelectForm from "./selectForm.js";
import PricingForm from "./pricingForm.js";

import { checkEmptyField } from "../../utils/formvalidation.js";

import Alert from "../layout/alert.js";

import { useSelector, useDispatch } from "react-redux";
import { clearErrors, createProduct } from "../../actions/products";
import { NEW_PRODUCT_RESET } from "../../constants/products.js";

import "react-quill/dist/quill.snow.css";
import styles from "./Form.module.css";

export default function Form({ history }) {
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const alerts = {
		emptyFields: "error",
		errors: "error",
		success: "success",
	};

	const { loading, success, error, product } = useSelector(
		(state) => state.newProduct
	);

	const categoriesOpt = ["Option 1", "Option 2", "Option 3"];
	const tagsOpt = ["Option 1", "Option 2", "Option 3"];

	const [name, setName] = useState();
	const [description, setDescription] = useState();
	const [price, setPrice] = useState();
	const [discountedPrice, setDiscountedPrice] = useState();
	const [stock, setStock] = useState();
	const [gallery, setGallery] = useState([]);
	const [featuredImage, setFeaturedImage] = useState();
	const [categories, setCategories] = useState([]);
	const [tags, setTags] = useState([]);

	const [showAlert, setShowAlert] = useState(false);
	const [alertType, setAlertType] = useState();
	const [alertMessage, setAlertMessage] = useState();

	const fields = {
		Name: name,
		Description: description,
		Price: price,

		Stock: stock,
		Gallery: gallery,
		FeaturedImage: featuredImage,
		Categories: categories,
		Tags: tags,
	};

	const submitHandler = () => {
		const empty = checkEmptyField(fields);

		if (!empty) {
			dispatch(
				createProduct({
					name,
					description,
					price,
					discountedPrice,
					stock,
					gallery,
					featuredImage,
					categories,
					tags,
				})
			);
		} else {
			setShowAlert(true);
			setAlertType(alerts.emptyFields);
			setAlertMessage(`Please Input ${empty.join(", ")}`);
		}
	};

	useEffect(() => {
		if (error) {
			setShowAlert(true);
			setAlertType(alerts.errors);
			setAlertMessage(error);
		}
		if (success) {
			setShowAlert(true);
			setAlertType(alerts.success);
			setAlertMessage("Product Created Successfully");
			navigate("/");
			dispatch({ type: NEW_PRODUCT_RESET });
		}
	}, [success, error, history, dispatch]);

	const removeHandler = (option, setValue) => {
		setValue((prev) => prev.filter((p) => p !== option));
	};

	return (
		<div className={styles.wrapper}>
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

			<div className={styles.flexbox}>
				<div className={styles.form}>
					<div className={styles.intro}>
						<div className={styles.inputDiv}>
							<input
								className={styles.input}
								type="text"
								name="name"
								onChange={(e) => setName(e.target.value)}
								id="name"
								placeholder="name"
							/>
						</div>
						<div className={styles.inputDiv}>
							<ReactQuill
								theme="snow"
								value={description}
								onChange={setDescription}
								className="bg-white"
							/>
						</div>
					</div>
					<PricingForm
						setPrice={setPrice}
						setStock={setStock}
						setDiscountedPrice={setDiscountedPrice}
					/>
					<GalleryForm
						setGallery={setGallery}
						gallery={gallery}
						removeHandler={removeHandler}
					/>
				</div>
				<div className={styles.sideBar}>
					<FeaturedImageForm
						setFeaturedImage={setFeaturedImage}
						featuredImage={featuredImage}
					/>
					<SelectForm
						id="Tags"
						value={tags}
						setValue={setTags}
						options={tagsOpt}
						removeHandler={removeHandler}
					/>
					<SelectForm
						id="Categories"
						value={categories}
						setValue={setCategories}
						options={categoriesOpt}
						removeHandler={removeHandler}
					/>
					<div onClick={submitHandler} className={styles.submit}>
						{!loading ? "Submit" : "Loading"}
					</div>
				</div>
			</div>
		</div>
	);
}
