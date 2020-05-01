$(document).ready(() => {

    // Load multiselect of students in class
    $('#students-select').selectpicker({
        liveSearch: true,
        title: 'Selecione os alunos',
        maxOptions: 5
    })

    // Load list of classes
    loadClasses = () => {
        const request = $.ajax({
            url: `${baseApi}classes`,
            method: 'GET',
            contentType: 'application/json; charset=utf-8',
        })

        request.done((data) => {  
            handleClassesFill(data)          
        })

        request.fail((jqXHR, textStatus) => {
            alert( "Verifique se o servidor backend está iniciado" )
        })
    }

    // Load list of students
    loadStudents = () => {
        const request = $.ajax({
            url: `${baseApi}people/students`,
            method: 'GET',
            contentType: 'application/json; charset=utf-8',
        })
        
        request.done((data) => {            
            handleStudentsFill(data)
        })

        request.fail((jqXHR, textStatus) => {
            alert( "Verifique se o servidor backend está iniciado" )
        })
    }

    // Validate new student form
    const formStudentItems = { '#student-name': 'INVALID' }
    $('#student-name').keyup((e) => {
        if (e.keyCode != TABKEY) {
            validateFormItem($('#student-name').val(), '#student-name', formStudentItems)
        }
    })

    // Submit new student
    $('#submit-student').click(() => {
        if (formIsValid) {
            $('#submit-student').prop('disabled')
            const request = $.ajax({
                url: `${baseApi}people`,
                method: 'POST',
                data: JSON.stringify({ name: $('#student-name').val(), profileID: 2 }),
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

    // Class form validation
    const formClassItems = { '#class-name': 'INVALID', '#students-select': 'INVALID' }
    $('#class-name').keyup((e) => {
        if (e.keyCode != TABKEY) {
            validateFormItem($('#class-name').val(), '#class-name', formClassItems)
        }
    })
    $('#students-select').change((e) => {
        if (e.keyCode != TABKEY) {
            validateFormItem($('#students-select').val(), '#students-select', formClassItems)
        }
    })

    // Submit new class
    $('#submit-class').click(() => {
        if (formIsValid) {
            $('#submit-class').prop('disabled', true)
            const request = $.ajax({
                url: `${baseApi}classes`,
                method: 'POST',
                data: JSON.stringify({ name: $('#class-name').val(), teacherID: JSON.parse(window.localStorage.getItem('user')).id }),
                contentType: 'application/json; charset=utf-8',
            })
            
            request.done((data) => {    
                index = 0;
                for (const studentID of $('#students-select').val()) {
                    index++;
                    const request = $.ajax({
                        url: `${baseApi}classes-students`,
                        method: 'POST',
                        data: JSON.stringify({ classID: data.id, studentID: parseInt(studentID) }),
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

    // Onload
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
})