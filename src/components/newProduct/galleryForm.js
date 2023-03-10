import styles from "./Form.module.css";

export default function GalleryForm({ gallery, setGallery, removeHandler }) {
	const onSelectGallery = (e) => {
		if (!e.target.files || e.target.files.length === 0) {
			setGallery(undefined);
			return;
		}

		setGallery((prev) => [...prev, ...e.target.files]);
	};

	return (
		<div className={styles.inputContainer}>
			<div className={styles.inputTitle}>Gallery</div>

			<div className={styles.galleryPreview}>
				{gallery.map((i, index) => (
					<div key={index} className={styles.featuredImage}>
						<img
							src={URL.createObjectURL(i)}
							width={150}
							alt="Thumb"
						/>
						<span
							onClick={() => removeHandler(i, setGallery)}
							className={styles.close}
						>
							x
						</span>
					</div>
				))}
				<div className={styles.galleryBtn}>
					<label
						className={styles.galleryInputFile}
						htmlFor="gallery"
					>
						Add Image
					</label>
					<input
						type="file"
						onChange={onSelectGallery}
						hidden
						multiple
						id="gallery"
					/>
				</div>
			</div>
		</div>
	);
}
