export const updateObjectInArray = (array: any, objProp: any, actionProp: any, newObject: any) => {
    return array.map((u: any) => {
        if (u[objProp] === actionProp) {
            return { ...u, ...newObject };
        } else {
            return u;
        }
    });
};
