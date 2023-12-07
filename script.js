        var selectedRow = null;

        function onFormSubmit(event) {
            event.preventDefault(); // Prevent the default form submission behavior
            var formData = readFormData();
            if (selectedRow == null) {
                insertNewRecord(formData);
            } else {
                updateRecord(formData);
            }
            resetForm();
        }

        function computation() {
            var salary = parseInt(document.getElementById("perHour").value);
            var hour = parseInt(document.getElementById("hourWork").value);
            var days = parseInt(document.getElementById("dayWork").value);
            var week = parseInt(document.getElementById("weekWork").value);

            var grossIncome = salary * hour * days * week;

            return grossIncome;
        }

        function readFormData() {
            var formData = {};
            formData["fullName"] = document.getElementById("fullName").value;
            formData["position"] = document.getElementById("position").value;
            formData["weekWork"] = document.getElementById("weekWork").value;
            formData["dayWork"] = document.getElementById("dayWork").value;
            formData["hourWork"] = document.getElementById("hourWork").value;
            formData["perHour"] = document.getElementById("perHour").value;
            formData["grossIncome"] = computation();
            return formData;
        }

        function insertNewRecord(data) {
            var table = document.getElementById("storeList").getElementsByTagName('tbody')[0];
            var newRow = table.insertRow(table.length);
            for (var key in data) {
                var cell = newRow.insertCell();
                cell.innerHTML = data[key];
            }        
            var cellActions = newRow.insertCell();
            cellActions.innerHTML = '<button onClick="onEdit(this)">Edit</button> <button onClick="onDelete(this)">Delete</button>';
        }

        function onEdit(td) {
            selectedRow = td.parentElement.parentElement;
            document.getElementById("fullName").value = selectedRow.cells[0].innerHTML;
            document.getElementById("position").value = selectedRow.cells[1].innerHTML;
            document.getElementById("weekWork").value = selectedRow.cells[2].innerHTML;
            document.getElementById("dayWork").value = selectedRow.cells[3].innerHTML;
            document.getElementById("hourWork").value = selectedRow.cells[4].innerHTML;
            document.getElementById("perHour").value = selectedRow.cells[5].innerHTML;
        }

        function updateRecord(formData) {
            selectedRow.cells[0].innerHTML = formData.fullName;
            selectedRow.cells[1].innerHTML = formData.position;
            selectedRow.cells[2].innerHTML = formData.weekWork;
            selectedRow.cells[3].innerHTML = formData.dayWork;
            selectedRow.cells[4].innerHTML = formData.hourWork;
            selectedRow.cells[5].innerHTML = formData.perHour;
            selectedRow.cells[6].innerHTML = formData.grossIncome;
        }

        function onDelete(td) {
            if (confirm('Do you want to delete this record?')) {
                var row = td.parentElement.parentElement;
                document.getElementById('storeList').deleteRow(row.rowIndex);
                resetForm();
            }
        }

        function resetForm() {
            selectedRow = null;
            document.getElementById("fullName").value = '';
            document.getElementById("position").value = '';
            document.getElementById("weekWork").value = '';
            document.getElementById("dayWork").value = '';
            document.getElementById("hourWork").value = '';
            document.getElementById("perHour").value = '';
        }
