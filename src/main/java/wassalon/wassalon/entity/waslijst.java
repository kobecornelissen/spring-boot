package wassalon.wassalon.entity;

import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
public class waslijst {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String naam;

    private LocalDate datum;

    @Lob
    private String items;

    @Lob
    private String opmerking;

    public waslijst(Long id, String naam, LocalDate datum, String items, String opmerking) {
        this.id = id;
        this.naam = naam;
        this.datum = datum;
        this.items = items;
        this.opmerking = opmerking;
    }

    public waslijst() {
    }

    // Getters en setters

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getNaam() { return naam; }
    public void setNaam(String naam) { this.naam = naam; }

    public LocalDate getDatum() { return datum; }
    public void setDatum(LocalDate datum) { this.datum = datum; }

    public String getItems() { return items; }
    public void setItems(String items) { this.items = items; }

    public String getOpmerking() { return opmerking; }
    public void setOpmerking(String opmerking) { this.opmerking = opmerking; }
}
