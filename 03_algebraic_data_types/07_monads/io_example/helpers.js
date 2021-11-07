export const ManagerDOM = (selector) => {
    const element = document.getElementById(selector);
    return {
        css(props) {
            Object.keys(props).forEach((k) => {
                console.log(props);
                element.style[k] = props[k];
            });
            return this;
        }  
    };
};

export const setOnLocalStorage = (key, obj) => {
    const objString = JSON.stringify(obj);
    localStorage.setItem(key, objString);
};
