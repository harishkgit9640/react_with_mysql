// server/controllers/project.controller.js
import promisePool from '../config/db.config.js';

const pool = promisePool;

export const projectController = {

    // Create new project
    createProject: async (req, res) => {
        try {
            const {
                name, status, level, description, url, implemented_in_dist,
                dist_login_avl, nodal_office, nodal_contact_no, dio_id_avl,
                dio_id, manpower_avl, mp_name, mp_post, mp_contact_no,
                spc_name, handling_officer, contact_no, district_name, remarks
            } = req.body;

            const [result] = await pool.query(
                `INSERT INTO all_projects (
                    name, status, level, description, url, implemented_in_dist,
                    dist_login_avl, nodal_office, nodal_contact_no, dio_id_avl,
                    dio_id, manpower_avl, mp_name, mp_post, mp_contact_no,
                    spc_name, handling_officer, contact_no, district_name, remarks
                ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
                [
                    name, status, level, description, url, implemented_in_dist,
                    dist_login_avl, nodal_office, nodal_contact_no, dio_id_avl,
                    dio_id, manpower_avl, mp_name, mp_post, mp_contact_no,
                    spc_name, handling_officer, contact_no, district_name, remarks
                ]
            );

            res.status(201).json({
                success: true,
                message: 'Project created successfully',
                data: { id: result.insertId }
            });
        } catch (error) {
            console.error('Error creating project:', error);
            res.status(500).json({
                success: false,
                message: 'Error creating project',
                error: error.message
            });
        }
    },

    // Get all projects
    getAllProjects: async (req, res) => {
        // console.log(req.params.district_name);
        const district_name = req.params.district_name
        try {
            let condition = ";"
            if (district_name !== "admin") {
                condition = `WHERE district_name='${district_name.toLowerCase()}';`
            };

            const [rows] = await pool.query(`SELECT * FROM all_projects ${condition}`);
            res.json({
                success: true,
                data: rows
            });
        } catch (error) {
            console.error('Error fetching projects:', error);
            res.status(500).json({
                success: false,
                message: 'Error fetching projects',
                error: error.message
            });
        }
    },

    // Get single project
    getProjectById: async (req, res) => {
        try {
            const [rows] = await pool.query('SELECT * FROM all_projects WHERE id = ?', [req.params.id]);

            if (rows.length === 0) {
                return res.status(404).json({
                    success: false,
                    message: 'Project not found'
                });
            }

            res.json({
                success: true,
                data: rows[0]
            });
        } catch (error) {
            console.error('Error fetching project:', error);
            res.status(500).json({
                success: false,
                message: 'Error fetching project',
                error: error.message
            });
        }
    },

    // update project
    updateProject: async (req, res) => {
        try {
            const updateData = {};
            const allowedFields = [
                'name', 'status', 'level', 'description', 'url', 'implemented_in_dist',
                'dist_login_avl', 'nodal_office', 'nodal_contact_no', 'dio_id_avl',
                'dio_id', 'manpower_avl', 'mp_name', 'mp_post', 'mp_contact_no',
                'spc_name', 'handling_officer', 'contact_no', 'district_name', 'remarks'
            ];

            // Only include fields that are present in the request body
            allowedFields.forEach(field => {
                if (req.body[field] !== undefined) {
                    updateData[field] = req.body[field];
                }
            });

            // If no fields to update, return error
            if (Object.keys(updateData).length === 0) {
                return res.status(400).json({
                    success: false,
                    message: 'No fields to update'
                });
            }

            const [result] = await pool.query(
                'UPDATE all_projects SET ? WHERE id = ?',
                [updateData, req.params.id]
            );

            if (result.affectedRows === 0) {
                return res.status(404).json({
                    success: false,
                    message: 'Project not found'
                });
            }

            res.json({
                success: true,
                message: 'Project updated successfully'
            });
        } catch (error) {
            console.error('Error updating project:', error);
            res.status(500).json({
                success: false,
                message: 'Error updating project',
                error: error.message
            });
        }
    },

    // Delete project
    deleteProject: async (req, res) => {
        try {
            const [result] = await pool.query('DELETE FROM all_projects WHERE id = ?', [req.params.id]);

            if (result.affectedRows === 0) {
                return res.status(404).json({
                    success: false,
                    message: 'Project not found'
                });
            }

            res.json({
                success: true,
                message: 'Project deleted successfully'
            });
        } catch (error) {
            console.error('Error deleting project:', error);
            res.status(500).json({
                success: false,
                message: 'Error deleting project',
                error: error.message
            });
        }
    }
};






export default projectController;