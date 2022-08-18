import clsx from "clsx";

// const appendClasses = (arr) => {
//   let classes = [];

//   for (let i = 0; i < arr.length; i++) {
//     if (styles[arr[i]] != undefined) {
//       classes.push(styles[arr[i]]);
//       console.log(styles[arr[i]]);
//     } else {
//       classes.push(arr[i]);
//     }
//   }

//   return classes;
// };

const Container = (props) => {
	// TODO: FIX extra classes
  //if (props.class == undefined)
	return <div className="grid">{props.children}</div>;

//   let classesArr = props.class.split(" ");
//   let classes = appendClasses(classesArr);

//   return <div className={clsx("grid", classes)}>{props.children}</div>;
}

export default Container;
