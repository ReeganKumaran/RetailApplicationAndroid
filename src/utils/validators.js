// Validation helper functions

export const validatePhoneNumber = (phone) => {
  if (!phone) return { isValid: false, error: "Phone number is required" };

  // Remove spaces and hyphens for validation
  const cleanPhone = phone.replace(/[\s-]/g, '');

  // Indian mobile number validation (10 digits starting with 6-9)
  const phoneRegex = /^[6-9]\d{9}$/;

  if (!phoneRegex.test(cleanPhone)) {
    return {
      isValid: false,
      error: "Please enter a valid 10-digit mobile number starting with 6-9"
    };
  }

  return { isValid: true, error: null };
};

export const validateAadhar = (aadhar) => {
  if (!aadhar) return { isValid: false, error: "Aadhar number is required" };

  // Remove spaces and hyphens for validation
  const cleanAadhar = aadhar.replace(/[\s-]/g, '');

  // Aadhar number validation (12 digits)
  const aadharRegex = /^\d{12}$/;

  if (!aadharRegex.test(cleanAadhar)) {
    return {
      isValid: false,
      error: "Please enter a valid 12-digit Aadhar number"
    };
  }

  return { isValid: true, error: null };
};

export const validateEmail = (email) => {
  if (!email) return { isValid: false, error: "Email is required" };

  // Email validation regex
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailRegex.test(email)) {
    return {
      isValid: false,
      error: "Please enter a valid email address"
    };
  }

  return { isValid: true, error: null };
};

export const validatePostalCode = (postalCode) => {
  if (!postalCode) return { isValid: false, error: "PIN code is required" };

  // Indian PIN code validation (6 digits)
  const postalCodeRegex = /^\d{6}$/;

  if (!postalCodeRegex.test(postalCode)) {
    return {
      isValid: false,
      error: "Please enter a valid 6-digit PIN code"
    };
  }

  return { isValid: true, error: null };
};

// Format helpers
export const formatPhoneNumber = (phone) => {
  const cleaned = phone.replace(/\D/g, '');
  const match = cleaned.match(/^(\d{5})(\d{5})$/);
  if (match) {
    return `${match[1]} ${match[2]}`;
  }
  return cleaned;
};

export const formatAadhar = (aadhar) => {
  const cleaned = aadhar.replace(/\D/g, '');
  const match = cleaned.match(/^(\d{4})(\d{4})(\d{4})$/);
  if (match) {
    return `${match[1]}-${match[2]}-${match[3]}`;
  }
  return cleaned;
};

// Validate all form fields
export const validateFormData = (formData, fieldsToValidate = []) => {
  const errors = {};

  if (fieldsToValidate.includes('phoneNumber')) {
    const phoneValidation = validatePhoneNumber(formData.phoneNumber);
    if (!phoneValidation.isValid) {
      errors.phoneNumber = phoneValidation.error;
    }
  }

  if (fieldsToValidate.includes('email')) {
    const emailValidation = validateEmail(formData.email);
    if (!emailValidation.isValid) {
      errors.email = emailValidation.error;
    }
  }

  if (fieldsToValidate.includes('aadhar')) {
    const aadharValidation = validateAadhar(formData.aadhar);
    if (!aadharValidation.isValid) {
      errors.aadhar = aadharValidation.error;
    }
  }

  if (fieldsToValidate.includes('postalCode') && formData.deliveryAddress?.postalCode) {
    const postalValidation = validatePostalCode(formData.deliveryAddress.postalCode);
    if (!postalValidation.isValid) {
      errors['deliveryAddress.postalCode'] = postalValidation.error;
    }
  }

  if (fieldsToValidate.includes('customerPostalCode') && formData.customerDetail?.customerAddress?.postalCode) {
    const postalValidation = validatePostalCode(formData.customerDetail.customerAddress.postalCode);
    if (!postalValidation.isValid) {
      errors['customerDetail.customerAddress.postalCode'] = postalValidation.error;
    }
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};
