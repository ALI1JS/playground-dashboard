

export const validateField = (name: string, value: string): void => {
    let errMsg = '';
    if (!value) {
        errMsg = `${name.replace(/([A-Z])/g, ' $1').trim()} is required.`;
    } else if (name === 'password' && value.length < 8) {
        errMsg = 'Password must be at least 8 characters long.';
    }
    else if (name === "username")
    {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
          errMsg = 'Invalid email format.';
        }
    }

    // setErrors(prevErrors => ({ ...prevErrors, [name]: errMsg }));
};