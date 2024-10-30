/* eslint-disable class-methods-use-this */
class Validator {
  constructor() {
    this.isFinalValue = true;
  }

  validateEmail(value) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(value).toLowerCase());
  }

  minLength(value, len) {
    if (value.length < len) {
      return false;
    }
    return true;
  }

  #checkData(value, name) {
    const data = value.trim();

    if (data === '') {
      this.isFinalValue = false;
      return { isValid: false, message: 'This field is required' };
    }

    if (name === 'email') {
      const isValid = this.validateEmail(data);
      if (!isValid) {
        this.isFinalValue = false;
        return { isValid: false, message: 'Mail is incorrect' };
      }
    }

    if (name === 'user' || name === 'message') {
      if (name === 'user') {
        const isValid = this.minLength(data, 3);
        if (!isValid) {
          this.isFinalValue = false;
          return { isValid: false, message: 'Minimum 3 characters' };
        }
      }
      if (name === 'message') {
        const isValid = this.minLength(data, 10);
        if (!isValid) {
          this.isFinalValue = false;
          return { isValid: false, message: 'Minimum 10 characters' };
        }
      }
    }
    return { isValid: true };
  }

  validate(elements) {
    this.isFinalValue = true;
    const result = {};

    for (let i = 0; i < elements.length; i += 1) {
      if (elements[i].name) {
        result[elements[i].name] = this.#checkData(elements[i].value, elements[i].name);
      }
    }

    result.isFinalValue = this.isFinalValue;

    return result;
  }
}

const validator = new Validator();

export default validator;
