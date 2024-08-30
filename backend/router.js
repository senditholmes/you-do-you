import { Router } from "express";
const router = Router();

router.get("/userDetails", (req, res) => {
  console.log(req, res);
});

router.put("/updateName", (req, res) => {
  console.log(req, res);
});

export default router;
