(function () {

    // The HTML for this View
    var viewHTML;
    var scope = [window.config.clientID];

    function showError(endpoint, error, errorElement) {
        console.error(error);
        printErrorMessage("Error calling " + endpoint + ": " + JSON.stringify(error, null, 4));
    }

    function error(error)
    {
        printErrorMessage(error);
    }

    function refreshViewData() {

        // Empty Old View Contents
        var $dataContainer = $(".data-container");
        $dataContainer.empty();
        var $loading = $(".view-loading");

        clientApplication.acquireTokenSilent(scope).then(function (token) {
            // Get TodoList Data
            $.ajax({
                type: "GET",
                url: "/api/TodoList",
                headers: {
                    'Authorization': 'Bearer ' + token,
                },
            }).done(function (data) {

                var $html = $(viewHTML);
                var $template = $html.find(".data-container");

                // For Each Todo Item Returned, Append a Table Row
                var output = data.reduce(function (rows, todoItem, index, todos) {
                    var $entry = $template;
                    var $description = $entry.find(".view-data-description").html(todoItem.Description);
                    $entry.find(".data-template").attr('data-todo-id', todoItem.ID);
                    return rows + $entry.html();
                }, '');

                // Update the UI
                $loading.hide();
                $dataContainer.html(output);

            }).fail(function (jqXHR, textStatus) {
                printErrorMessage('Error getting todo list data')
            }).always(function () {

                // Register Handlers for Buttons in Data Table
                registerDataClickHandlers();
            });
        }, function (error)
        {
            printErrorMessage(error);
        });
    }



    function registerDataClickHandlers() {

        // Delete Button(s)
        $(".view-data-delete").click(function (event) {
            clearErrorMessage();

            var todoId = $(event.target).parents(".data-template").attr("data-todo-id");

            // Acquire Token for Backend
            clientApplication.acquireTokenSilent(scope).then(function (token) {
                // Delete the Todo
                $.ajax({
                    type: "DELETE",
                    url: "/api/TodoList/" + todoId,
                    headers: {
                        'Authorization': 'Bearer ' + token,
                    },
                }).done(function () {
                    console.log('DELETE success.');
                }).fail(function () {
                    console.log('Fail on new Todo DELETE');
                    printErrorMessage('Error deleting todo item.')
                }).always(function () {
                    refreshViewData();
                });
            }, function (error) {
                printErrorMessage(error);
            });
        });


        // Edit Button(s)
        $(".view-data-edit").click(function (event) {
            clearErrorMessage();
            var $entry = $(event.target).parents(".data-template");
            var $entryDescription = $entry.find(".view-data-description").hide();
            var $editInput = $entry.find(".view-data-edit-input");
            $editInput.val($entryDescription.text());
            $editInput.show();
            $entry.find(".view-data-mode-delete").hide();
            $entry.find(".view-data-mode-edit").show();
        });

        // Cancel Button(s)
        $(".view-data-cancel-edit").click(function (event) {
            clearErrorMessage();
            $entry = $(event.target).parents(".data-template");
            $entry.find(".view-data-description").show();
            $editInput = $entry.find(".view-data-edit-input").hide();
            $editInput.val('');
            $entry.find(".view-data-mode-delete").show();
            $entry.find(".view-data-mode-edit").hide();
        });

        // Save Button(s)
        $(".view-data-save").click(function (event) {
            clearErrorMessage();
            var $entry = $(event.target).parents(".data-template");
            var todoId = $entry.attr("data-todo-id");

            // Validate Todo Description
            var $description = $entry.find(".view-data-edit-input");
            if ($description.val().length <= 0) {
                printErrorMessage('Please enter a valid Todo description');
                return;
            }

            // Acquire Token for Backend
            clientApplication.acquireTokenSilent(scope).then(function (token) {
                // Update Todo Item
                $.ajax({
                    type: "PUT",
                    url: "/api/TodoList",
                    headers: {
                        'Authorization': 'Bearer ' + token,
                    },
                    data: {
                        Description: $description.val(),
                        ID: todoId,
                    },
                }).done(function () {
                    console.log('PUT success.');
                }).fail(function () {
                    console.log('Fail on todo PUT');
                    printErrorMessage('Error saving todo item.')
                }).always(function () {
                    refreshViewData();
                    $description.val('');
                });
            }, function (error) {
                printErrorMessage(error);
                });
        });
    };

    function registerViewClickHandlers() {

        // Add Button
        $(".view-addTodo").click(function () {
            clearErrorMessage();

            // Validate Todo Description
            var $description = $("#view-todoDescription");
            if ($description.val().length <= 0) {
                printErrorMessage('Please enter a valid Todo description');
                return;
            }

            // Acquire Token for Backend
            clientApplication.acquireTokenSilent(scope).then(function (token) {
                // POST a New Todo
                $.ajax({
                    type: "POST",
                    url: "/api/TodoList",
                    headers: {
                        'Authorization': 'Bearer ' + token,
                    },
                    data: {
                        Description: $description.val(),
                    },
                }).done(function () {
                    console.log('POST success.');
                }).fail(function () {
                    console.log('Fail on new Todo POST');
                    printErrorMessage('Error adding new todo item.');
                }).always(function () {

                    // Refresh TodoList
                    $description.val('');
                    refreshViewData();
                });
            }, function (error) {
                printErrorMessage(error);
            });
        });
    };

    function clearErrorMessage() {
        var $errorMessage = $(".app-error");
        $errorMessage.empty();
    };

    function printErrorMessage(mes) {
        var $errorMessage = $(".app-error");
        $errorMessage.html(mes);
    }

    // Module
    window.todoListCtrl = {
        requireADLogin: true,
        preProcess: function (html) {

        },
        postProcess: function (html) {
            viewHTML = html;
            registerViewClickHandlers();
            refreshViewData();
        },
    };
}());

