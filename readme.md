# Django POS Application Structure

## Suggested Django App Structure

1. **Inventory Management App** (`inventory`)
2. **Production Management App** (`production`)
3. **Orders and Sales App** (`orders`)
4. **Customer Management App** (`customers`)
5. **Warehouse Management App** (`warehouse`)
6. **User Management App** (`users`)
7. **Notification Management App** (`notifications`)

Let's break down the structure and responsibilities of each app.

### 1. Inventory Management App (`inventory`)

This app is responsible for managing raw materials and products inventory. It also includes categories to better organize products.

- **Models:**
  - `RawMaterial`: Manages inventory for raw cloth rolls (e.g., width, length, remaining quantity).
  - `Product`: Manages inventory for finished products like shirts and pants.
  - `Category`: Represents different categories of products (e.g., shirts, pants) with fields `name` and `description`.
  - `Stock`: Records stock related to each product and `Warehouse`.

- **Views:**
  - CRUD operations for raw materials, products, and categories.
  - View available stock.

- **Endpoints:**
  - `/api/inventory/raw_materials/`
  - `/api/inventory/products/`
  - `/api/inventory/categories/`
  - `/api/inventory/stock/`

### 2. Production Management App (`production`)

This app handles the production process, including cutting and stitching, and links to specific warehouses.

- **Models:**
  - `ProductionOrder`: Tracks orders for specific garments to be produced, linked to `Warehouse`.
  - `CuttingOrder`: Represents how raw cloth is cut, linked to a `Warehouse`, `ProductionOrder`, and specifies the `RawMaterial` and quantity of raw material to be cut by the master.
  - `StitchingOrder`: Represents how materials are stitched into finished products, linked to a `Warehouse`, `ProductionOrder`, and `CuttingOrder`, and specifies the raw material to be stitched by a tailor.

- **Views:**
  - Create a production order.
  - Update production status (e.g., cutting, stitching, completed).

- **Endpoints:**
  - `/api/production/prod-orders/`
  - `/api/production/cutting/`
  - `/api/production/stitching/`

### 3. Orders and Sales App (`orders`)

This app manages customer orders and sales processes, including receiving orders and updating stock accordingly.

- **Models:**
  - `CustomerOrder`: Contains customer information, products ordered, order status, etc.
  - `SalesRecord`: Records sales transactions.

- **Views:**
  - Place an order.
  - View order status.

- **Endpoints:**
  - `/api/orders/customer_orders/`
  - `/api/orders/sales_records/`

### 4. Customer Management App (`customers`)

This app handles customer information, including customer details and their ability to place orders.

- **Models:**
  - `Customer`: Holds customer information.

- **Views:**
  - Register customer accounts.

- **Endpoints:**
  - `/api/customers/`

### 5. Warehouse Management App (`warehouse`)

This app tracks inventory storage and manages the movement of goods between different locations.

- **Models:**
  - `Warehouse`: Represents different warehouse locations.
  - `WarehouseStock`: Tracks inventory specific to each warehouse.

- **Views:**
  - Add new warehouse.
  - Update stock in a warehouse.

- **Endpoints:**
  - `/api/warehouse/`
  - `/api/warehouse/stock/`

### 6. User Management App (`users`)

This app manages users with different roles like staff and managers, including their roles and permissions. All users need to be authenticated.

- **Models:**
  - `Staff`: Holds staff user information (e.g., email, role).
  - `Manager`: Holds manager information.

- **Views:**
  - Create and manage user accounts.

- **Endpoints:**
  - `/api/users/`

### 7. Notification Management App (`notifications`)

This app handles email notifications for staff and managers.

- **Models:**
  - `Notification`: Keeps a record of notifications sent.

- **Views:**
  - Notify staff of new orders.
  - Manage notification settings.

- **Endpoints:**
  - `/api/notifications/`

## Relationships Between Models

- **RawMaterial** and **Product** models interact when raw material gets converted to products.
- **CustomerOrder** has a ForeignKey to **Customer** to associate each order with a customer.
- **ProductionOrder** has ForeignKeys to both **RawMaterial** and **Product** for tracking the process from raw material to product.
- **WarehouseStock** has ForeignKeys to **Warehouse** and **RawMaterial/Product** to track quantities in each warehouse.
- **SalesRecord** references **CustomerOrder** to log the sale of the products.
- **CuttingOrder** and **StitchingOrder** link to **Warehouse** to indicate where the raw materials and production processes are located.

## Steps in the Production Process

1. **Raw Material Inventory** (`inventory`)
   - Create a `RawMaterial` record representing the new cloth roll.
2. **Production Order** (`production`)
   - Create a `ProductionOrder` specifying the type of product (shirt, pant, etc.) to produce, linked to a specific `Warehouse`.
   - A `CuttingOrder` is created when the cloth is cut to required sizes, specifying the `Warehouse`, `ProductionOrder`, and `RawMaterial` details.
   - Create a `StitchingOrder` linked to a `Warehouse`, `ProductionOrder`, and `CuttingOrder` for tailors to finish the garment.
3. **Product Inventory Update** (`inventory`)
   - Once stitching is complete, update the `Product` inventory.
4. **Customer Order** (`orders`)
   - A customer logs in and places an order, or a staff member can place it on behalf of the customer.
5. **Notifications** (`notifications`)
   - Notify the staff and manager when an order is placed.
6. **Order Processing** (`orders`)
   - The staff prepares the order and updates the order status.
   - Update the `Product` inventory to reflect sales.

## App Dependencies

- The **inventory** and **production** apps interact to convert raw materials into products.
- The **orders** app interacts with **customers** to manage customer orders and with **inventory** to update stock.
- The **notifications** app sends emails for new orders and other relevant updates.
- The **warehouse** app helps maintain inventory locations.

