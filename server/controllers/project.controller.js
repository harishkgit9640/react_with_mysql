// server/controllers/project.controller.js
import promisePool from '../config/db.config.js';

const pool = promisePool;

export const projectController = {

    // Create new project
    createProject: async (req, res) => {
        try {
            const {
                project_name, status, level, description, project_url, implemented_in_dist,
                dist_login_avl, nodal_office, nodal_contact_no, dio_id_avl,
                dio_id, manpower_avl, mp_name, mp_post, mp_contact_no,
                spc_name, handling_officer, contact_no, district_name, remarks
            } = req.body;

            // check any of below mobile number should be 10 digits
            if ((nodal_contact_no && nodal_contact_no.length !== 10) || (mp_contact_no && mp_contact_no.length !== 10) || (contact_no && contact_no.length !== 10)) {
                return res.status(400).json({
                    success: false,
                    message: 'Nodal contact number, MP contact number or contact number should be 10 digits'
                });
            }

            // check project name and url is unique or not
            const [rows] = await pool.query(
                `SELECT * FROM all_projects WHERE project_name = ? OR project_url = ?`,
                [project_name, project_url]
            );
            if (rows.length > 0) {
                return res.status(400).json({
                    success: false,
                    message: 'Project name or URL already exists'
                });
            }


            const [result] = await pool.query(
                `INSERT INTO all_projects (
                    project_name, status, level, description, project_url, implemented_in_dist,
                    dist_login_avl, nodal_office, nodal_contact_no, dio_id_avl,
                    dio_id, manpower_avl, mp_name, mp_post, mp_contact_no,
                    spc_name, handling_officer, contact_no, district_name, remarks
                ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
                [
                    project_name, status, level, description, project_url, implemented_in_dist,
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
                'project_name', 'status', 'level', 'description', 'project_url', 'implemented_in_dist',
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


            // check project name and url is unique or not
            const [rows] = await pool.query(
                `SELECT * FROM all_projects WHERE project_name = ? OR project_url = ?`,
                [project_name, project_url]
            );
            if (rows.length > 0) {
                return res.status(400).json({
                    success: false,
                    message: 'Project name or URL already exists'
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
    },

    // Project toggle status
    toggleStatus: async (req, res) => {
        try {
            const userId = req.params.id;

            // First check if user exists
            const [project] = await pool.query(
                'SELECT id, status FROM all_projects WHERE id = ?',
                [userId]
            );

            if (project.length === 0) {
                return res.status(404).json({
                    success: false,
                    message: 'Project not found'
                });
            }

            // Toggle the status (if active -> inactive, if inactive -> active)
            const newStatus = project[0].status === 'Active' ? 'Inactive' : 'Active';

            // Update the project's status
            await pool.query(
                'UPDATE all_projects SET status = ? WHERE id = ?',
                [newStatus, userId]
            );

            res.json({
                success: true,
                message: `Projects status updated to ${newStatus}`,
                data: {
                    id: userId,
                    status: newStatus
                }
            });
        } catch (error) {
            console.error('Toggle status error:', error);
            res.status(500).json({
                success: false,
                message: 'Error updating Projects status'
            });
        }
    },
};






export default projectController;