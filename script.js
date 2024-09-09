function handleDrag(event) {
    var data = {
        id: event.target.dataset.id,  
        status: event.target.dataset.status
    };
    var json_data = JSON.stringify(data);
    event.dataTransfer.setData('data', json_data);
}

function handleDragover(event) {
    event.preventDefault();
}

function handleDrop(event) {
    event.preventDefault();
    
    var data = JSON.parse(event.dataTransfer.getData('data'));
    var id = data.id;
    var currentStatus = data.status;
    var newStatus;


    if (event.target.closest('#open')) {
        newStatus = 'open';
    } else if (event.target.closest('#finished')) {
        newStatus = 'finished';
    } else if (event.target.closest('#pro')) {
        newStatus = 'pro';
    }


    if (newStatus && currentStatus !== newStatus) {
        apex.server.process('Update Todo', {
            x01: newStatus,
            x02: id
        }, {
            success: function() {
                apex.event.trigger('#open', 'apexrefresh');
                apex.event.trigger('#finished', 'apexrefresh');
                apex.event.trigger('#pro', 'apexrefresh');
            },
            dataType: 'text'
        });
    }
}
