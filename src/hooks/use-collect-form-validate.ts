import { useState } from "react";

type HookCallback = (validationStatus?: boolean) => void;

const useCollectFormDataAndValidate = (initialValues: any, callback: HookCallback) => {
    const [inputs, setInputs] = useState(initialValues);

    const validateInputs = (obj: any): boolean => {
        let validationStatus = false;

        for (let propertyIndex in obj) {
            const propertyValue = obj[propertyIndex];
            const validation = propertyValue !== undefined &&
                propertyValue !== null && (propertyValue !== 0 || propertyValue !== "");

            validationStatus = validation;

            if (!validation) {
                break;
            }
        }

        return validationStatus;
    };

    const handleSubmit = (event: any) => {
        if (event) {
            event.preventDefault();
        }

        const validationStatus = validateInputs(inputs);

        callback(validationStatus);
    };

    const handleChange = (event: any, name?: string, value?: any) => {
        if (event) {
            event.persist();
        }

        if (name === undefined) {
            const propertyName = event.target.name;
            const propertyValue = event.target.value;

            if (propertyName && propertyValue) {
                setInputs({
                    ...inputs,
                    [propertyName]: propertyValue
                });
            }
        } else {
            setInputs({
                ...inputs,
                [name]: value
            });
        }
    };

    return {
        handleSubmit,
        handleChange,
        inputs
    };
};

export default useCollectFormDataAndValidate;
