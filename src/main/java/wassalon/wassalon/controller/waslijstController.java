package wassalon.wassalon.controller;

import org.springframework.web.bind.annotation.*;
import wassalon.wassalon.entity.waslijst;
import wassalon.wassalon.repository.waslijstRepository;

import java.util.List;

@RestController
@RequestMapping("/api/waslijst")
@CrossOrigin(origins = "*")  // Voor frontend toegang
public class waslijstController {

    private final waslijstRepository repository;

    public waslijstController(waslijstRepository repository) {
        this.repository = repository;
    }

    @PostMapping
    public waslijst voegToe(@RequestBody waslijst waslijst) {
        return repository.save(waslijst);
    }

    @GetMapping
    public List<waslijst> getAll() {
        return repository.findAll();
    }
}
