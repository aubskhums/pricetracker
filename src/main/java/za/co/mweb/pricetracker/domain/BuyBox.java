package za.co.mweb.pricetracker.domain;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.time.Instant;

/**
 * A BuyBox.
 */
@Entity
@Table(name = "buy_box")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class BuyBox implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "is_pre_order")
    private Boolean isPreOrder;

    @Column(name = "promition_qty")
    private Integer promitionQty;

    @Column(name = "product_id")
    private Long productId;

    @Column(name = "add_to_cart_text")
    private String addToCartText;

    @Column(name = "product_line_id")
    private Instant productLineId;

    @Column(name = "is_add_to_wish_list_available")
    private Boolean isAddToWishListAvailable;

    @Column(name = "is_digital")
    private Boolean isDigital;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Boolean isIsPreOrder() {
        return isPreOrder;
    }

    public BuyBox isPreOrder(Boolean isPreOrder) {
        this.isPreOrder = isPreOrder;
        return this;
    }

    public void setIsPreOrder(Boolean isPreOrder) {
        this.isPreOrder = isPreOrder;
    }

    public Integer getPromitionQty() {
        return promitionQty;
    }

    public BuyBox promitionQty(Integer promitionQty) {
        this.promitionQty = promitionQty;
        return this;
    }

    public void setPromitionQty(Integer promitionQty) {
        this.promitionQty = promitionQty;
    }

    public Long getProductId() {
        return productId;
    }

    public BuyBox productId(Long productId) {
        this.productId = productId;
        return this;
    }

    public void setProductId(Long productId) {
        this.productId = productId;
    }

    public String getAddToCartText() {
        return addToCartText;
    }

    public BuyBox addToCartText(String addToCartText) {
        this.addToCartText = addToCartText;
        return this;
    }

    public void setAddToCartText(String addToCartText) {
        this.addToCartText = addToCartText;
    }

    public Instant getProductLineId() {
        return productLineId;
    }

    public BuyBox productLineId(Instant productLineId) {
        this.productLineId = productLineId;
        return this;
    }

    public void setProductLineId(Instant productLineId) {
        this.productLineId = productLineId;
    }

    public Boolean isIsAddToWishListAvailable() {
        return isAddToWishListAvailable;
    }

    public BuyBox isAddToWishListAvailable(Boolean isAddToWishListAvailable) {
        this.isAddToWishListAvailable = isAddToWishListAvailable;
        return this;
    }

    public void setIsAddToWishListAvailable(Boolean isAddToWishListAvailable) {
        this.isAddToWishListAvailable = isAddToWishListAvailable;
    }

    public Boolean isIsDigital() {
        return isDigital;
    }

    public BuyBox isDigital(Boolean isDigital) {
        this.isDigital = isDigital;
        return this;
    }

    public void setIsDigital(Boolean isDigital) {
        this.isDigital = isDigital;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof BuyBox)) {
            return false;
        }
        return id != null && id.equals(((BuyBox) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "BuyBox{" +
            "id=" + getId() +
            ", isPreOrder='" + isIsPreOrder() + "'" +
            ", promitionQty=" + getPromitionQty() +
            ", productId=" + getProductId() +
            ", addToCartText='" + getAddToCartText() + "'" +
            ", productLineId='" + getProductLineId() + "'" +
            ", isAddToWishListAvailable='" + isIsAddToWishListAvailable() + "'" +
            ", isDigital='" + isIsDigital() + "'" +
            "}";
    }
}
