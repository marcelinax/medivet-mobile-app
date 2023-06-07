import {Error, FormError} from "types/api/error/types";

const parseErrorMessage = (errorMessage: string): string => {
    const words = errorMessage.replace('.', '').split(' ');
    return words.map(word => word.toUpperCase()).join('_');
};

export const getParsedErrors = (errors: Error[]): Error[] => {
    const newErrors: Error[] = [];
    errors?.filter(err => err)?.map(err => {
        let newError = err;
        const message = err.message;
        if (message) {
            if (typeof message === 'object') {
                const messages: string[] = message;
                messages?.forEach(mes => {
                    const err = {
                        ...newError,
                        message: parseErrorMessage(mes)
                    };
                    newErrors.push(err);
                });
            } else {
                newError.message = parseErrorMessage(message);
                newErrors.push(newError);
            }
        }
    });

    return newErrors;
};

export const handleInputErrors = (allErrors: Error[], errorsMessages: string[], field: string): FormError => {
    const inputErrors: Error[] = [];
    getParsedErrors(allErrors).map((error: Error) => {
        if (errorsMessages.includes(error.message)) {
            const err = getParsedErrors(allErrors).find(e => JSON.stringify(e) === JSON.stringify(error));
            if (err) {
                inputErrors.push(err);
            }
        }
    });

    return {
        errors: inputErrors,
        field
    };
};

export const getInputErrors = (errors: FormError[], field: string): Error[] => {
    return errors.find(error => error.field === field)?.errors.filter(err => err) || [];
};

export const hasInternalError = (errors: Error[]): boolean => {
    return !!errors?.find(err => err?.statusCode === 500 || err?.statusCode === 404);
};
