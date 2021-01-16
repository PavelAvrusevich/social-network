export const updateObjectInArray = (array, objProp, actionProp, newObject) => {
    return array.map((u) => {
        if (u[objProp] === actionProp) {
            return { ...u, ...newObject };
        } else {
            return u;
        }
    });
};
