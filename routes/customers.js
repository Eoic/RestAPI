const errors = require('restify-errors');
const Customer = require('../models/Customer');

module.exports = server => {
    server.get('/customers', async (_req, res, next) => {
        try {
            const customers = await Customer.find({});
            res.send(customers);
            next();
        } catch (error) {
            return next(new errors.InvalidContentError(error));
        }
    });

    server.get('/customers/:id', async (req, res, next) => {
        try {
            const customer = await Customer.findById(req.params.id);
            res.send(customer);
            next();
        } catch (error) {
            return next(new errors.ResourceNotFoundError(`No customer with id ${req.params.id}`));
        }
    });

    server.post('/customers', async (req, res, next) => {
        if (!req.is('application/json'))
            return next(new errors.InvalidContentError('Expects \'application/json\''));

        const { name, email, balance } = req.body;
        const customer = new Customer({ name, email, balance });

        try {
            await customer.save();
            res.send(201);
            next();
        } catch (error) {
            return next(new errors.InternalError(error.message));
        }
    });

    server.put('/customers/:id', async (req, res, next) => {
        if (!req.is('application/json'))
            return next(new errors.InvalidContentError('Expects \'application/json\''));

        try {
            await Customer.findOneAndUpdate({ _id: req.params.id }, req.body);
            res.send(200);
            next();
        } catch (error) {
            return next(new errors.ResourceNotFoundError(`No customer with id ${req.params.id}`));
        }
    });

    server.del('/customers/:id', async (req, res, next) => {
        try {
            await Customer.findOneAndDelete({ _id: req.params.id });
            res.send(204);
            next();
        } catch (error) {
            return next(new errors.ResourceNotFoundError(`No customer with id ${req.params.id}`));
        }
    });
}