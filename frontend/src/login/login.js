$(document).ready(() => {
    const formItems = {
        '#username': 'INVALID',
        '#password': 'INVALID'
    }

    $('#username').keyup((e) => {
        if (e.keyCode != TABKEY) {
            validateFormItem($('#username').val(), '#username', formItems)
        }
    })

    $('#password').keyup((e) => {
        if (e.keyCode != TABKEY) {
            validateFormItem($('#password').val(), '#password', formItems)
        }
    })

    // Submit
    $('#form-login').submit((event) => {
        if (formIsValid) {
            const request = $.ajax({
                url: `${baseApi}login`,
                method: 'POST',
                data: JSON.stringify({ 
                    username: $('#username').val(), 
                    password: $('#password').val() 
                }),
                contentType: 'application/json; charset=utf-8',
            })
            
            request.done((data) => {
                if (data) {
                    window.localStorage.setItem('user', JSON.stringify(data))
                    window.location.href = '../dashboard/dashboard.html'
                } else {
                    $('#user-not-found').removeClass('d-none')
                }
            })

            request.fail((jqXHR, textStatus) => {
                alert( "Request failed: " + textStatus )
            })
        }
        event.preventDefault()
    })
})