package abda.postservice.web.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping ("/api/v1/posts")
public class PostController {
    
    @GetMapping
    public String test() {
        return "Post Controller works!";
    }

}
