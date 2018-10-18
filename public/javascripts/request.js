// CRUD - Create (POST), Read (GET), Update (PUT), Delete (DELETE)

// function deleteContact() {
//     document.getElementById("deleteDoc").click();
// }


// https://github.com/michaelcheng924/ajax-restful-api-tutorial/blob/master/scripts.js
$(function() {
    // GET/READ
    $('#get-button').on('click', function() {
        $.ajax({
            url: '/',
            contentType: 'application/json',
            success: function(response) {
                var tbodyEl = $('tbody');

                tbodyEl.html('');

                response.products.forEach(function(product) {
                    tbodyEl.append('\
                        <tr>\
                            <td class="id">' + product.id + '</td>\
                            <td><input type="text" class="name" value="' + product.name + '"></td>\
                            <td>\
                                <button class="update-button">UPDATE/PUT</button>\
                                <button class="delete-button">DELETE</button>\
                            </td>\
                        </tr>\
                    ');
                });
            }
        });
    });
});