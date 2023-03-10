import styles from "./Form.module.css";

export default function PricingForm({
	setPrice,
	setDiscountedPrice,
	setStock,
}) {
	return (
		<div className={styles.inputContainer}>
			<div className={styles.inputTitle}>Pricing</div>
			<div className={styles.inputFlexbox}>
				<div className={styles.inputDivHalf}>
					<input
						className={styles.input}
						onChange={(e) => setPrice(e.target.value)}
						type="number"
						name="price"
						id="price"
						placeholder="Price"
					/>
				</div>
				<div className={styles.inputDivHalf}>
					<input
						className={styles.input}
						onChange={(e) => setDiscountedPrice(e.target.value)}
						type="number"
						name="discountedPrice"
						id="discountedPrice"
						placeholder="Discounted Price"
					/>
				</div>
				<div className={styles.inputDivHalf}>
					<input
						className={styles.input}
						onChange={(e) => setStock(e.target.value)}
						type="number"
						name="stock"
						id="stock"
						placeholder="Stock Availiable"
					/>
				</div>
			</div>
		</div>
	);
}
