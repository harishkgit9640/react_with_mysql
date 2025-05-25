import promisePool from '../config/db.config.js';

const pool = promisePool;

export const contactController = {
    // Get all contacts
    getAllContacts: async (req, res) => {
        try {
            const [contacts] = await pool.query(
                'SELECT * FROM contact_details ORDER BY created_at DESC'
            );

            res.json({
                success: true,
                data: contacts
            });
        } catch (error) {
            console.error('Error fetching contacts:', error);
            res.status(500).json({
                success: false,
                message: 'Error fetching contacts',
                error: error.message
            });
        }
    },

    // Get single contact
    getContactById: async (req, res) => {
        try {
            const [contacts] = await pool.query(
                'SELECT * FROM contact_details WHERE id = ?',
                [req.params.id]
            );

            if (contacts.length === 0) {
                return res.status(404).json({
                    success: false,
                    message: 'Contact not found'
                });
            }

            res.json({
                success: true,
                data: contacts[0]
            });
        } catch (error) {
            console.error('Error fetching contact:', error);
            res.status(500).json({
                success: false,
                message: 'Error fetching contact',
                error: error.message
            });
        }
    },

    // Create new contact
    createContact: async (req, res) => {
        try {
            const { name, email, subject, message } = req.body;

            // Validate required fields
            if (!name || !email || !message) {
                return res.status(400).json({
                    success: false,
                    message: 'Name, email and message are required'
                });
            }

            const [result] = await pool.query(
                'INSERT INTO contact_details (name, email, subject, message) VALUES (?, ?, ?, ?)',
                [name, email, subject, message]
            );

            res.status(201).json({
                success: true,
                message: 'Contact message sent successfully',
                data: { id: result.insertId }
            });
        } catch (error) {
            console.error('Error creating contact:', error);
            if (error.code === 'ER_DUP_ENTRY') {
                return res.status(400).json({
                    success: false,
                    message: 'A contact with this email already exists'
                });
            }
            res.status(500).json({
                success: false,
                message: 'Error creating contact',
                error: error.message
            });
        }
    },

    // Delete contact
    deleteContact: async (req, res) => {
        try {
            const [result] = await pool.query(
                'DELETE FROM contact_details WHERE id = ?',
                [req.params.id]
            );

            if (result.affectedRows === 0) {
                return res.status(404).json({
                    success: false,
                    message: 'Contact not found'
                });
            }

            res.json({
                success: true,
                message: 'Contact deleted successfully'
            });
        } catch (error) {
            console.error('Error deleting contact:', error);
            res.status(500).json({
                success: false,
                message: 'Error deleting contact',
                error: error.message
            });
        }
    }
}; 