import styles from "./Form.module.css";

export default function SelectForm({
	id,
	value,
	setValue,
	options,
	removeHandler,
}) {
	const selectHandler = (e, value, setValue) => {
		if (!value.includes(e.target.value)) {
			setValue((prev) => [...prev, e.target.value]);
		}
	};
	return (
		<div className={styles.inputContainer}>
			<div className={styles.inputTitle}>{id}</div>
			<select
				onChange={(e) => selectHandler(e, value, setValue)}
				name=""
				id={id}
				className={styles.select}
			>
				{options.map((t, index) => (
					<option key={index} value={t}>
						{t}
					</option>
				))}
			</select>
			{value.map((c, index) => (
				<div key={index} className={styles.chip}>
					{c}
					<span
						onClick={() => removeHandler(c, setValue)}
						className={styles.close}
					>
						x
					</span>
				</div>
			))}
		</div>
	);
}
