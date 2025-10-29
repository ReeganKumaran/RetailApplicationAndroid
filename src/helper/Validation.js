// Email validation
export const validateEmail = (email) => {
    if (!email) return true; // Email is optional
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email.trim());
};

// Phone number validation (must be 10 digits)
export const validatePhone = (phone) => {
    // If phone is empty, don't fail format validation here — required check is handled by caller.
    if (!phone && phone !== 0) return true;
    return /^[0-9]{10}$/.test(String(phone).trim());
};

// Required field validation
export const validateRequired = (value) => {
    return value

    // return value && value.trim().length > 0;
};

export const validatePassword = (password) => {
    return password.length >= 8;
}
// Number field validation (must be positive number)
export const validatePositiveNumber = (value) => {
    // If value is empty, don't fail here — caller should enforce requiredness when needed.
    if (value === null || value === undefined || String(value).trim() === "") return true;
    const num = Number(value);
    return !isNaN(num) && num > 0;
};

// PIN code validation (must be 6 digits)
export const validatePinCode = (pinCode) => {
    if (!pinCode && pinCode !== 0) return true;
    return /^[0-9]{6}$/.test(String(pinCode).trim());
};

// Rental form validation
export const validateRentalForm = (formData, showDeliveryAddress) => {
    let errors = {};
    let isValid = true;

    // Customer Information Validation
    if (!validateRequired(formData.customer)) {
        errors.customer = 'Customer name is required';
        isValid = false;
    }

    if (!validateRequired(formData.phoneNumber)) {
        errors.phoneNumber = 'Phone number is required';
        isValid = false;
    } else if (!validatePhone(formData.phoneNumber)) {
        errors.phoneNumber = 'Enter a valid 10-digit phone number';
        isValid = false;
    }

    if (formData.email && !validateEmail(formData.email)) {
        errors.email = 'Enter a valid email address';
        isValid = false;
    }

    // Item Details Validation
    if (!validateRequired(formData.itemDetail.name)) {
        errors.itemName = 'Item name is required';
        isValid = false;
    }

    if (!validateRequired(formData.itemDetail.price)) {
        errors.price = 'Price is required';
        isValid = false;
    } else if (!validatePositiveNumber(formData.itemDetail.price)) {
        errors.price = 'Enter a valid price';
        isValid = false;
    }

    if (!validateRequired(formData.itemDetail.quantity)) {
        errors.quantity = 'Quantity is required';
        isValid = false;
    } else if (!validatePositiveNumber(formData.itemDetail.quantity)) {
        errors.quantity = 'Enter a valid quantity';
        isValid = false;
    }

    if (!validateRequired(formData.itemDetail.size)) {
        errors.size = 'Size is required';
        isValid = false;
    }

    // Advance amount: required + positive number
    if (!validateRequired(formData.itemDetail.advanceAmount)) {
        errors.advanceAmount = 'Advance amount is required';
        isValid = false;
    } else if (!validatePositiveNumber(formData.itemDetail.advanceAmount)) {
        errors.advanceAmount = 'Enter a valid advance amount';
        isValid = false;
    }

    // Date Validation
    if (!formData.deliveryDate) {
        errors.deliveryDate = 'Delivery date is required';
        isValid = false;
    }

    // Delivery Address Validation (only if shown)
    if (showDeliveryAddress) {
        if (!validateRequired(formData.deliveryAddress.street)) {
            errors.street = 'Street address is required';
            isValid = false;
        }
        if (!validateRequired(formData.deliveryAddress.city)) {
            errors.city = 'City is required';
            isValid = false;
        }
        if (!validateRequired(formData.deliveryAddress.state)) {
            errors.state = 'State is required';
            isValid = false;
        }
        if (!validateRequired(formData.deliveryAddress.postalCode)) {
            errors.postalCode = 'PIN code is required';
            isValid = false;
        } else if (!validatePinCode(formData.deliveryAddress.postalCode)) {
            errors.postalCode = 'Enter a valid 6-digit PIN code';
            isValid = false;
        }
    }

    return { isValid, errors };
};
