import clsx from 'clsx';

const appendClasses = (arr) => {
	let classes = [];
	
	for (let i = 0; i < arr.length; i++) {
		if(styles[arr[i]] != undefined) {
			classes.push(styles[arr[i]]);
		} else {
			classes.push(arr[i]);
		}
	}
	
	return classes;
}

const Col = (props) => {
	let xs, sm, md, lg;
	let classesArr;
	let classes = props.customClass;
	
	// if(/\s/.test(props.customClass)) {
	// 	classesArr = props.customClass.split(' ');
	// 	classes = appendClasses(classesArr);
	// } else if(props.customClass) {
	// 	classesArr = props.customClass;
	// 	classes = appendClasses(classesArr);
	// }
	
	props.xs ? xs = 'col-xs-'+props.xs : props.xs;
	props.sm ? sm = 'col-sm-'+props.sm : props.sm;
	props.md ? md = 'col-md-'+props.md : props.md;
	props.lg ? lg = 'col-lg-'+props.lg : props.lg;
	
	return (
		<div className={clsx(xs, sm, md, lg, classes)}>{props.children}</div>
	);
};

export default Col;