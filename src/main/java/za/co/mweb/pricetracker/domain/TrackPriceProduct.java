package za.co.mweb.pricetracker.domain;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.time.ZonedDateTime;

/**
 * A TrackPriceProduct.
 */
@Entity
@Table(name = "track_price_product")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class TrackPriceProduct implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "current_price")
    private Float currentPrice;

    @Column(name = "date_time_price_modified")
    private ZonedDateTime dateTimePriceModified;

    @NotNull
    @Column(name = "p_ild", nullable = false)
    private String pILD;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Float getCurrentPrice() {
        return currentPrice;
    }

    public TrackPriceProduct currentPrice(Float currentPrice) {
        this.currentPrice = currentPrice;
        return this;
    }

    public void setCurrentPrice(Float currentPrice) {
        this.currentPrice = currentPrice;
    }

    public ZonedDateTime getDateTimePriceModified() {
        return dateTimePriceModified;
    }

    public TrackPriceProduct dateTimePriceModified(ZonedDateTime dateTimePriceModified) {
        this.dateTimePriceModified = dateTimePriceModified;
        return this;
    }

    public void setDateTimePriceModified(ZonedDateTime dateTimePriceModified) {
        this.dateTimePriceModified = dateTimePriceModified;
    }

    public String getpILD() {
        return pILD;
    }

    public TrackPriceProduct pILD(String pILD) {
        this.pILD = pILD;
        return this;
    }

    public void setpILD(String pILD) {
        this.pILD = pILD;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof TrackPriceProduct)) {
            return false;
        }
        return id != null && id.equals(((TrackPriceProduct) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "TrackPriceProduct{" +
            "id=" + getId() +
            ", currentPrice=" + getCurrentPrice() +
            ", dateTimePriceModified='" + getDateTimePriceModified() + "'" +
            ", pILD='" + getpILD() + "'" +
            "}";
    }
}
