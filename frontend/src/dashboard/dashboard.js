$(document).ready(() => {
    loadStudents = () => {
        const request = $.ajax({
            url: `${baseApi}people/students`,
            method: 'GET',
            contentType: 'application/json; charset=utf-8',
        })
        
        request.done((data) => {
            $('#table-students tbody').empty();

            let html = ''
            if (data) {
                for (const item of data) {
                    html += '<tr>'
                    html += '<td>'
                    html += item.id
                    html += '</td>'
                    html += '<td>'
                    html += item.name
                    html += '</td>'
                    html += '</tr>'
                }
            } else {
                html += '<tr>'
                html += '<td colspan="2">'
                html += 'Nenhum aluno encontrado'
                html += '</td>'
                html += '</tr>'
            }

            $('#table-students tbody').append(html);
        })

        request.fail((jqXHR, textStatus) => {
            alert( "Request failed: " + textStatus )
        })
    }
    boot = () => {
        if (!window.localStorage.getItem('user')) {
            window.location.href = '../login/login.html'
        } else {
            $('#container').removeClass('d-none')
            loadStudents()
        }
    }

    boot()

    $('#student-name').keyup((e) => {
        if (e.keyCode != TABKEY) {
            const formItems = { '#student-name': 'INVALID' }
            validateFormItem($('#student-name').val(), '#student-name', formItems)
        }
    })

    $('#submit-student').click(() => {
        if (formIsValid) {
            $('#submit-student').prop('disabled')
            const request = $.ajax({
                url: `${baseApi}people`,
                method: 'POST',
                data: JSON.stringify({
                    name: $('#student-name').val(),
                    profileID: 2
                }),
                contentType: 'application/json; charset=utf-8',
            })
            
            request.done((data) => {    
                $('#add-student').modal('hide')
                $('#student-name').val('')
                loadStudents()
            })
    
            request.fail((jqXHR, textStatus) => {
                $('#err-add-student').removeClass('d-none')
            })
        }
    })
})