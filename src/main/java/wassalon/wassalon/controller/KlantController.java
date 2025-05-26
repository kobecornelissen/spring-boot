package wassalon.wassalon.controller;

import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/klanten")
public class KlantController {

    @GetMapping
    public List<String> getKlanten() {
        return List.of("Jos", "Marie", "Ahmed");
    }
}
