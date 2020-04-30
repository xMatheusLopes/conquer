const TABKEY = 9
let formIsValid = false;

// Check if can submit
setSubmitBtnDisabled = () => {
    formIsValid ? 
        $('.btn-submit').prop('disabled', false) 
        : $('.btn-submit').prop('disabled', true)
}

// Validate form
checkFormIsValid = (formItems) => {
    let isValid = true
    for (const key in formItems) {
        if (formItems[key] == 'INVALID') {
            isValid = false
        }
    }
    if(!isValid) {
        $('.btn-submit').prop('disabled')
        formIsValid = false
        setSubmitBtnDisabled()
    } else {
        $('.btn-submit').prop('disabled', false)
        formIsValid = true
        setSubmitBtnDisabled()
    }
}

validateFormItem = (value, id, formItems) => {
    if (value && value.length) {
        formItems[id] = 'VALID'
        $(`${id}-required-alert`).addClass('d-none')
    } else {
        formItems[id] = 'INVALID'
        $(`${id}-required-alert`).removeClass('d-none')
    }
    checkFormIsValid(formItems)
}