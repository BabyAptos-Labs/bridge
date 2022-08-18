import clsx from "clsx";

function appendClasses(arr) {
  let classes = [];

  for (let i = 0; i < arr.length; i++) {
    classes.push(arr[i]);
  }

  return classes;
}

const Row = (props) => {
  let classesArr, classes;

  props.customClass != undefined
    ? (classesArr = props.customClass.split(" "))
    : "";
  props.customClass != undefined ? (classes = appendClasses(classesArr)) : "";

  return <div className={clsx("row", classes)}>{props.children}</div>;
};

export default Row;
