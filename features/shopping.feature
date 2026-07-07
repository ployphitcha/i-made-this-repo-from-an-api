Feature: E-Commerce End-to-End Shopping Flow

  Scenario: Successfully login, checkout items, and verify address
    Given User navigates to login page
    When User logs in with email "admin@admin.com" and password "admin123"
    Then User should be on the product listing page
    
    When User adds "2" units of "Dior J'adore" to the cart
    And User adds "3" units of "Gucci Bloom Eau de" to the cart
    Then The total cost should reflect "$419.95" correctly
    
    When User clicks proceed to checkout
    And User fills required shipping details with Phone "0812345678", Street "5876 Little Streets", City "London", Country "United Kingdom"
    And User submits the order
    Then The confirmation screen should display the address format "5876 Little Streets, London - United Kingdom" correctly