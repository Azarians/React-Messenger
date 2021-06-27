export const toggleMode = (firstTime) =>{
  const body = document.body;
  let nextMode = body.getAttribute("data-mode") == "dark" ? "light" : "dark";
  if(firstTime){
    nextMode = localStorage.getItem("mode") || nextMode;
  }
  document.documentElement.style.setProperty('--scrollbar-color', nextMode != "dark" ? "#D9D9DA" : "rgb(75, 85, 99)");
  body.setAttribute("data-mode", nextMode);
  localStorage.setItem("mode", nextMode);
  return nextMode;
}

export const usePrevious = (value) => {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}
