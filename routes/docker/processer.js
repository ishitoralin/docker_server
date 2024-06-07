const { parse, stringify } = require('flatted');

exports.resultsHandler = (res, err, data) => {
    if (err) {
        console.error('Error getting data:', err);
        res.status(500).json({ error: 'Error getting data' });
    } else {
        try {
            res.send(data);
        } catch (error) {
            res.send(stringify(data));
        }
    }
};
