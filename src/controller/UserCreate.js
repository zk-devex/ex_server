import User from '../models/User';

// Controller methods
export const createUser = async (req, res) => {
    try {
        const { name, username, email, phone, website } = req.body;
        const { street, suite, city, zipcode, lat, lng } = req.body.address;
        const { companyName, catchPhrase, bs } = req.body.company;

        // Validate input
        if (!name || !username || !email || !phone || !website ||
            !street || !suite || !city || !zipcode || !lat || !lng ||
            !companyName || !catchPhrase || !bs) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const newUser = new User({
            name,
            username,
            email,
            address: {
                street,
                suite,
                city,
                zipcode,
                geo: {
                    lat,
                    lng
                }
            },
            phone,
            website,
            company: {
                name: companyName,
                catchPhrase,
                bs
            }
        });

        await newUser.save();
        res.status(201).json(newUser);
    } catch (err) {
        if (err.name === 'ValidationError') {
            // Mongoose validation error
            const errors = Object.values(err.errors).map(error => error.message);
            return res.status(400).json({ message: errors.join(', ') });
        } else {
            // Other errors
            res.status(500).json({ message: err.message });
        }
    }
};
