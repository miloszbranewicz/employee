import { Request, Response } from "express";
import { authRouter } from "./routes";
import { passportLocal } from "../../config/passport";
import { db } from "../../config/db";
import bcrypt from "bcrypt";
import { Role } from "../../config/constants";
import { Employee } from "@prisma/client";

/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Register a new user with email and password
 *     description: |
 *       Register a new user with an email and password. Only administrators can register new users.
 *     tags:
 *       - Authentication
 *     requestBody:
 *       description: User information including email and password.
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               user:
 *                 type: object
 *                 properties:
 *                   email:
 *                     type: string
 *                   password:
 *                     type: string
 *             example:
 *               user:
 *                 email: john@example.com
 *                 password: secret123
 *     responses:
 *       201:
 *         description: User registration successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 user:
 *                   type: object
 *                   description: The registered user's information.
 *                   properties:
 *                     id:
 *                       type: number
 *                     email:
 *                       type: string
 *                     phoneNumber:
 *                       type: string
 *                     firstName:
 *                       type: string
 *                     lastName:
 *                       type: string
 *                     role:
 *                       type: string
 *             example:
 *               user:
 *                 id: 1
 *                 email: john@example.com
 *                 phoneNumber: 1234567890
 *                 firstName: John
 *                 lastName: Doe
 *                 role: EMPLOYEE
 *
 *       400:
 *         description: Bad request. Invalid or missing email/password, or user already exists.
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
 *               User already exists:
 *                 error: User already exists
 *       500:
 *         description: Internal server error occurred during registration.
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
export const register = async (req: Request, res: Response) => {
  try {
    const { user } = req.body;
    const { email, password } = user as Employee;

    if (!email || !password) {
      return res.status(400).json({ error: "Email and password required" });
    }

    const userExists = await db.employee.findUnique({
      where: { email },
    });

    if (userExists) {
      return res.status(400).json({ error: "User already exists" });
    }

    const hashedPassword = bcrypt.hashSync(password, 12);

    const newUser = await db.employee.create({
      data: {
        ...user,
        password: hashedPassword,
        role: Role.EMPLOYEE,
      },
    });
    const { password: _, ...userWithoutPassword } = newUser;

    res.status(201).json({ user: userWithoutPassword });
  } catch (error) {
    console.error("Error during registration:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
