$(document).ready(() => {

    $('#students-select').selectpicker({
        liveSearch: true,
        title: 'Selecione os alunos',
        maxOptions: 5
    })

    loadClasses = () => {
        const request = $.ajax({
            url: `${baseApi}classes`,
            method: 'GET',
            contentType: 'application/json; charset=utf-8',
        })

        request.done((data) => {            
            let html = ''

            if (data.length) {
                for (const item of data) {
                    let classesHTML = ''
                    for(const student of item.students) {
                        classesHTML += `<span class="subtext"># ${student.name}</span>`
                    }

                    html += `<tr data-toggle="collapse" href="#accordion${item.id}" class="clickable cursor-pointer">`
                    html += '<td class="columnA">'
                    html += `${item.name}`
                    html += '</td>'
                    html += '<td class="columnB">'
                    html += item.students.length == 0 ? 'N/A' : item.students.length
                    html += '</td>'
                    html += '</tr>'

                    if (item.students.length) {
                        html += `<tr id="accordion${item.id}" class="collapse">`
                        html += '<td colspan="3">'
                        html += `
                            <div class="select-column">
                                ${classesHTML}
                            </div>
                        `
                        html += '</td>'
                        html += '</tr>'
                    }
                }
            } else {
                html += '<tr>'
                html += '<td colspan="3">'
                html += 'Nenhuma turma encontrada'
                html += '</td>'
                html += '</tr>'
            }

            $('#table-classes tbody').empty().append(html);
        })

        request.fail((jqXHR, textStatus) => {
            alert( "Verifique se o servidor backend está iniciado" )
        })
    }

    loadStudents = () => {
        const request = $.ajax({
            url: `${baseApi}people/students`,
            method: 'GET',
            contentType: 'application/json; charset=utf-8',
        })
        
        request.done((data) => {
            $('#students-select').empty();
            
            let html = ''
            let options = '';

            if (data.length) {
                for (const item of data) {
                    html += '<tr>'
                    html += '<td class="studentColumnA">'
                    html += item.name
                    html += '</td>'
                    html += '</tr>'

                    options += `<option value="${item.id}">${item.name}</option>`
                }
            } else {
                html += '<tr>'
                html += '<td colspan="2">'
                html += 'Nenhum aluno encontrado'
                html += '</td>'
                html += '</tr>'
            }

            $('#table-students tbody').empty().append(html);
            $('#students-select').empty().append(options).selectpicker('refresh')
        })

        request.fail((jqXHR, textStatus) => {
            alert( "Verifique se o servidor backend está iniciado" )
        })
    }
    boot = () => {
        if (!window.localStorage.getItem('user')) {
            window.location.href = '../login/login.html'
        } else {
            $('#container').removeClass('d-none')
            loadStudents()
            loadClasses()
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

    const formItems2 = { '#class-name': 'INVALID', '#students-select': 'INVALID' }

    $('#class-name').keyup((e) => {
        if (e.keyCode != TABKEY) {
            validateFormItem($('#class-name').val(), '#class-name', formItems2)
        }
    })

    $('#students-select').change((e) => {
        if (e.keyCode != TABKEY) {
            validateFormItem($('#students-select').val(), '#students-select', formItems2)
        }
    })

    $('#submit-class').click(() => {
        if (formIsValid) {
            $('#submit-class').prop('disabled', true)
            const request = $.ajax({
                url: `${baseApi}classes`,
                method: 'POST',
                data: JSON.stringify({
                    name: $('#class-name').val(),
                    teacherID: JSON.parse(window.localStorage.getItem('user')).id
                }),
                contentType: 'application/json; charset=utf-8',
            })
            
            request.done((data) => {    
                index = 0;
                for (const studentID of $('#students-select').val()) {
                    index++;
                    const request = $.ajax({
                        url: `${baseApi}classes-students`,
                        method: 'POST',
                        data: JSON.stringify({
                            classID: data.id,
                            studentID: parseInt(studentID)
                        }),
                        contentType: 'application/json; charset=utf-8',
                    })

                    request.done((data) => {
                        if (index == ($('#students-select').val().length)) {
                            $('#add-class').modal('hide')
                            $('#class-name').val('')
                            $('#students-select').val([]).selectpicker('refresh')
                            loadClasses()
                        }
                    });

                    request.fail((jqXHR, textStatus) => {
                        $('#err-add-class').removeClass('d-none')
                    })
                }
            })
    
            request.fail((jqXHR, textStatus) => {
                $('#err-add-student').removeClass('d-none')
            })
        }
    })

    $('#logout').click(() => {
        window.localStorage.removeItem('user')
        window.location.href = "../login/login.html"
    })
})