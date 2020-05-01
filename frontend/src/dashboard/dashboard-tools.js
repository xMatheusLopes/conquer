$(document).ready(() => {
    handleClassesFill = (data) => {
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
    }

    handleStudentsFill = (data) => {
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
    }
})