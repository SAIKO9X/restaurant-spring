package com.food.ordering.config;

import com.food.ordering.model.dto.ContactInformation;
import com.food.ordering.model.entities.*;
import com.food.ordering.model.enums.USER_ROLE;
import com.food.ordering.repositories.*;
import com.food.ordering.services.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.Collections;
import java.util.List;

@Component
@RequiredArgsConstructor
@Order(2)
public class DatabaseLoader implements CommandLineRunner {

  private final RestaurantRepository restaurantRepository;
  private final CategoryRepository categoryRepository;
  private final IngredientsCategoryRepository ingredientsCategoryRepository;
  private final IngredientsItemRepository ingredientsItemRepository;
  private final FoodRepository foodRepository;
  private final AddressRepository addressRepository;
  private final AuthService authService;

  @Override
  @Transactional
  public void run(String... args) throws Exception {
    if (restaurantRepository.count() > 0) {
      System.out.println("---- O banco de dados já contém restaurantes. A pular a população. ----");
      return;
    }

    System.out.println("---- Populando o banco de dados com dados fictícios ----");

    // --- Criando 5 Donos de Restaurante ---
    User owner1 = createOwner("dono1@rest.com", "João Silva");
    User owner2 = createOwner("dono2@rest.com", "Maria Oliveira");
    User owner3 = createOwner("dono3@rest.com", "Carlos Pereira");
    User owner4 = createOwner("dono4@rest.com", "Ana Costa");
    User owner5 = createOwner("dono5@rest.com", "Pedro Souza");

    // --- Restaurante 1: Hamburgueria (Menu Completo) ---
    setupBurgerQueen(owner1);

    // --- Restaurante 2: Pizzaria ---
    setupPizzaPalace(owner2);

    // --- Restaurante 3: Comida Japonesa ---
    setupSushiHouse(owner3);

    // --- Restaurante 4: Café & Doceria ---
    setupSweetBeans(owner4);

    // --- Restaurante 5: Comida Saudável ---
    setupGreenLeaf(owner5);

    System.out.println("---- Banco de dados populado com sucesso com 5 restaurantes! ----");
  }

  private User createOwner(String email, String fullName) throws Exception {
    User owner = new User();
    owner.setEmail(email);
    owner.setFullName(fullName);
    owner.setPassword("password123");
    owner.setRole(USER_ROLE.ROLE_RESTAURANT_OWNER);

    return authService.createUser(owner);
  }

  private void setupBurgerQueen(User owner) {
    Address address = new Address();
    address.setStreetAddress("Avenida dos Hamburgers, 123");
    address.setCity("São Paulo");
    address.setStateProvince("SP");
    address.setPostalCode("01000-000");
    address.setCountry("Brasil");

    Restaurant r1 = createRestaurant(
      "Burger Queen",
      "A melhor hamburgueria da cidade com blends artesanais e ingredientes frescos.",
      "Hamburgueria",
      "Seg-Dom: 18:00 - 23:30",
      List.of(
        "https://images.unsplash.com/photo-1571091718767-18b5b1457add?q=80&w=2072&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1550547660-d9450f859349?q=80&w=1965&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1561758033-d89a9ad46330?q=80&w=2070&auto=format&fit=crop"
      ),
      owner,
      address);

    Category catHamburgers = createCategory("Hambúrgueres", r1);
    Category catPorcoes = createCategory("Porções", r1);
    Category catBebidas = createCategory("Bebidas", r1);

    IngredientCategory catPao = createIngredientCategory("Pães", r1);
    IngredientCategory catCarne = createIngredientCategory("Carnes", r1);
    IngredientCategory catQueijo = createIngredientCategory("Queijos", r1);
    IngredientCategory catSalada = createIngredientCategory("Saladas", r1);
    IngredientCategory catMolho = createIngredientCategory("Molhos", r1);

    IngredientsItem paoBrioche = createIngredientItem("Pão Brioche", catPao, r1);
    IngredientsItem paoAustraliano = createIngredientItem("Pão Australiano", catPao, r1);
    IngredientsItem carne180g = createIngredientItem("Blend Bovino 180g", catCarne, r1);
    IngredientsItem frangoCrocante = createIngredientItem("Frango Crocante", catCarne, r1);
    IngredientsItem queijoCheddar = createIngredientItem("Queijo Cheddar", catQueijo, r1);
    IngredientsItem queijoPrato = createIngredientItem("Queijo Prato", catQueijo, r1);
    IngredientsItem alface = createIngredientItem("Alface Americana", catSalada, r1);
    IngredientsItem tomate = createIngredientItem("Tomate Fresco", catSalada, r1);
    IngredientsItem molhoEspecial = createIngredientItem("Molho Especial da Casa", catMolho, r1);
    IngredientsItem bacon = createIngredientItem("Bacon em Tiras", catCarne, r1);

    createFood("Cheeseburger Clássico", "Pão brioche, blend 180g, queijo cheddar e molho da casa.", 25.50, catHamburgers, r1, true, false,
      List.of(paoBrioche, carne180g, queijoCheddar, molhoEspecial),
      "https://images.unsplash.com/photo-1550547660-d9450f859349?q=80&w=1965&auto=format&fit=crop");

    createFood("Bacon Supreme", "Pão australiano, blend 180g, queijo prato, bacon crocante, alface e tomate.", 32.00, catHamburgers, r1, true, false,
      List.of(paoAustraliano, carne180g, queijoPrato, bacon, alface, tomate),
      "https://images.unsplash.com/photo-1561758033-d89a9ad46330?q=80&w=2070&auto=format&fit=crop");

    createFood("Chicken Crispy", "Pão brioche, filé de frango empanado, queijo prato e alface.", 28.00, catHamburgers, r1, true, false,
      List.of(paoBrioche, frangoCrocante, queijoPrato, alface),
      "https://images.unsplash.com/photo-1562967914-608f82629710?q=80&w=2070&auto=format&fit=crop");

    createFood("Batata Frita", "Porção individual de batatas fritas crocantes.", 15.00, catPorcoes, r1, true, true,
      Collections.emptyList(), "https://images.unsplash.com/photo-1528751014936-863e6e7a319c?q=80&w=686&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D");

    createFood("Coca-Cola", "Lata 350ml", 5.00, catBebidas, r1, true, true, Collections.emptyList(),
      "https://images.unsplash.com/photo-1527960392543-80cd0fa46382?q=80&w=627&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D");
  }

  private void setupPizzaPalace(User owner) {
    Address address = new Address();
    address.setStreetAddress("Rua das Pizzas, 456");
    address.setCity("Rio de Janeiro");
    address.setStateProvince("RJ");
    address.setPostalCode("20000-000");
    address.setCountry("Brasil");

    Restaurant r2 = createRestaurant(
      "Pizza Palace",
      "Pizzas com massa de fermentação natural e ingredientes frescos.",
      "Pizzaria",
      "Ter-Dom: 19:00 - 00:00",
      List.of("https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=2070&auto=format&fit=crop"),
      owner,
      address);

    Category catPizzas = createCategory("Pizzas Salgadas", r2);
    createFood("Pizza Margherita", "Molho de tomate, muçarela e manjericão.", 45.00, catPizzas, r2, true, true, Collections.emptyList(),
      "https://images.unsplash.com/photo-1598021680133-eb3a820436a8?q=80&w=1935&auto=format&fit=crop");
  }

  private void setupSushiHouse(User owner) {
    Address address = new Address();
    address.setStreetAddress("Travessa do Sushi, 789");
    address.setCity("Curitiba");
    address.setStateProvince("PR");
    address.setPostalCode("80000-000");
    address.setCountry("Brasil");

    createRestaurant(
      "Sushi House",
      "O melhor da culinária japonesa tradicional e contemporânea.",
      "Japonesa",
      "Qua-Sab: 19:00 - 23:00",
      List.of("https://images.unsplash.com/photo-1579871494447-9811cf80d66c?q=80&w=2070&auto=format&fit=crop"),
      owner,
      address
    );
  }

  private void setupSweetBeans(User owner) {
    Address address = new Address();
    address.setStreetAddress("Alameda dos Cafés, 101");
    address.setCity("Belo Horizonte");
    address.setStateProvince("MG");
    address.setPostalCode("30000-000");
    address.setCountry("Brasil");

    createRestaurant(
      "Sweet Beans Café",
      "Cafés especiais, doces incríveis e um ambiente acolhedor.",
      "Cafeteria",
      "Seg-Sex: 08:00 - 19:00",
      List.of("https://images.unsplash.com/photo-1497935586351-b67a49e012bf?q=80&w=2071&auto=format&fit=crop"),
      owner,
      address
    );
  }

  private void setupGreenLeaf(User owner) {
    Address address = new Address();
    address.setStreetAddress("Praça da Salada, 222");
    address.setCity("Florianópolis");
    address.setStateProvince("SC");
    address.setPostalCode("88000-000");
    address.setCountry("Brasil");

    createRestaurant(
      "Green Leaf",
      "Comida saudável que abraça. Saladas, bowls e sucos naturais.",
      "Saudável",
      "Seg-Sab: 11:00 - 15:00",
      List.of("https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=2070&auto=format&fit=crop"),
      owner,
      address
    );
  }

  private Restaurant createRestaurant(String name, String description, String cuisine, String hours, List<String> imageUrls, User owner, Address address) {
    Address savedAddress = addressRepository.save(address);

    Restaurant restaurant = new Restaurant();
    restaurant.setName(name);
    restaurant.setDescription(description);
    restaurant.setCuisineType(cuisine);
    restaurant.setOpeningHours(hours);
    restaurant.setImages(imageUrls);
    restaurant.setOwner(owner);
    restaurant.setAddress(savedAddress);
    restaurant.setContact(new ContactInformation("contato@" + name.toLowerCase().replace(" ", "") + ".com", "(11) 99999-9999", "", "", ""));
    restaurant.setOpen(true);
    restaurant.setApproved(true);
    restaurant.setActive(true);
    restaurant.setRegistrationDate(LocalDateTime.now());
    return restaurantRepository.save(restaurant);
  }

  private Category createCategory(String name, Restaurant r) {
    Category cat = new Category();
    cat.setName(name);
    cat.setRestaurant(r);
    return categoryRepository.save(cat);
  }

  private IngredientCategory createIngredientCategory(String name, Restaurant r) {
    IngredientCategory cat = new IngredientCategory();
    cat.setName(name);
    cat.setRestaurant(r);
    return ingredientsCategoryRepository.save(cat);
  }

  private IngredientsItem createIngredientItem(String name, IngredientCategory cat, Restaurant r) {
    IngredientsItem item = new IngredientsItem();
    item.setName(name);
    item.setCategory(cat);
    item.setRestaurant(r);
    return ingredientsItemRepository.save(item);
  }

  private void createFood(String name, String desc, double price, Category cat, Restaurant r, boolean available, boolean isVegetarian, List<IngredientsItem> ingredients, String imageUrl) {
    Food food = new Food();
    food.setName(name);
    food.setDescription(desc);
    food.setPrice(price);
    food.setFoodCategory(cat);
    food.setRestaurant(r);
    food.setAvailable(available);
    food.setVegetarian(isVegetarian);
    food.setIngredients(ingredients);
    food.setImages(Collections.singletonList(imageUrl));
    food.setCreationDate(new java.util.Date());
    foodRepository.save(food);
  }
}