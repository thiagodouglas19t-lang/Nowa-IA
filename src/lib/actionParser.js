function parseAction(command) {
    const actionTypes = ['ALARME', 'EVENTO', 'TAREFA'];
    const actionRegex = /\[(ACAO:(.*?)\|(((\d{2}:\d{2})|(\d{4}-\d{2}-\d{2}))?\|?[^\]]*)?)\]/g;
    const results = [];
    let match;
    while ((match = actionRegex.exec(command)) !== null) {
        const actionDetails = match[2].split('|');
        const actionType = actionDetails[0];

        if (!actionTypes.includes(actionType)) {
            throw new Error(`Invalid action type: ${actionType}`);
        }

        const actionData = {};
        actionData.type = actionType;
        switch (actionType) {
            case 'ALARME':
                actionData.time = actionDetails[1];
                actionData.title = actionDetails[2];
                break;
            case 'EVENTO':
                actionData.date = actionDetails[1];
                actionData.time = actionDetails[2];
                actionData.title = actionDetails[3];
                break;
            case 'TAREFA':
                actionData.title = actionDetails[1];
                break;
        }
        results.push(actionData);
    }
    return results;
}

// Example Usage
// console.log(parseAction('[ACAO:ALARME|12:30|Wake up]'));
// console.log(parseAction('[ACAO:EVENTO|2026-04-20|14:00|Meeting]'));
// console.log(parseAction('[ACAO:TAREFA|Do laundry]'));