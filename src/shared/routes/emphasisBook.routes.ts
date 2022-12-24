import { Router } from "express";

import { ReadEmphasisBookController } from "../../modules/emphasisBook/useCases/ReadEmphasisBook/ReadEmphasisBookController";

const emphasisBookRouter = Router();

const readEmphasisBookController = new ReadEmphasisBookController();

emphasisBookRouter.get("/read", readEmphasisBookController.control);

export { emphasisBookRouter };
