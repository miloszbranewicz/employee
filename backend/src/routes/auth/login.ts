import { Request, Response } from "express";
import { db } from "../../config/db";
import bcrypt from "bcrypt";
import signWithJWT from "../../utils/signWIthJWT";
import { Role as TRole } from "../../types";

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Authenticate a user by email and password
 *     description: |
 *       Authenticate a user by providing their email and password.
 *     tags:
 *       - Authentication
 *     requestBody:
 *       description: User's email and password for authentication.
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *             example:
 *               email: john@example.com
 *               password: secret123
 *     responses:
 *       200:
 *         description: Authentication successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   description: JWT token for authenticated user.
 *             example:
 *               token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9
 *       400:
 *         description: Bad request. Invalid or missing email/password, or user not found.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *             examples:
 *               Invalid email and/or password:
 *                 error: Email and password required
 *               User not found:
 *                 error: User not found
 *               Invalid password:
 *                 error: Invalid password
 *       500:
 *         description: Internal server error occurred during authentication.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *             example:
 *               error: Internal server error
 */
export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "Email and password required" });
    }

    const user = await db.employee.findUnique({
      where: { email },
    });

    if (!user) {
      return res.status(400).json({ error: "User not found" });
    }

    const isPasswordValid = bcrypt.compareSync(password, user.password);

    if (!isPasswordValid) {
      return res.status(400).json({ error: "Invalid password" });
    }

    const token = signWithJWT({
      sub: user.id,
      email: user.email,
      role: user.role as TRole,
    });

    res.status(200).json({ token });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
