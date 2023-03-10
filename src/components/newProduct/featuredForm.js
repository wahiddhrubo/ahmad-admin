import styles from "./Form.module.css";

export default function FeaturedImageForm({ featuredImage, setFeaturedImage }) {
	const onSelectFeaturedImage = (e) => {
		if (!e.target.files || e.target.files.length === 0) {
			setFeaturedImage(undefined);
			return;
		}

		setFeaturedImage(e.target.files[0]);
	};
	return (
		<div className={styles.inputContainer}>
			<div className={styles.inputTitle}>Featured Image</div>
			{featuredImage ? (
				<div className={styles.featuredImage}>
					<img
						src={URL.createObjectURL(featuredImage)}
						width={200}
						alt="Thumb"
					/>
					<span
						onClick={() => setFeaturedImage(null)}
						className={styles.close}
					>
						x
					</span>
				</div>
			) : (
				<div>
					<label
						className={styles.galleryInputFile}
						htmlFor="featuredImage"
					>
						Choose File
					</label>
					<input
						type="file"
						onChange={onSelectFeaturedImage}
						hidden
						multiple
						id="featuredImage"
					/>
				</div>
			)}
		</div>
	);
}
