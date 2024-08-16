
### user-defined-ordered-list

imagine you have a set of categories, and every category has a set of products.

- the products of every category must be saved and retrieved ordered.

- the order of every product set will be determined by the user frequently.

### Solutions

1.  Linked List: Implement a linked list of products by adding a next_product field to the product table.
2.  Serialize Ordered Ids: serialize ordered ids to a comma-separated text, JSON, or  XML an apply the order of every set to that serialized content.
3.  Rank Field: add an order_index field to product table which keeps the rank of product in its category.

### 1. Linked List

The main benefit of a linked list is that the items can easily be inserted or removed without reallocation or reorganization of the entire structure.
in this approach add, insert and delete of the record is efficient but read a filtered and sorted list is not optimal. it's because of the function of the relational database. a relational database is not proper for linked data. 

* *Change(efficient)*
* *Read(inefficient)*

### 2. Serialized Order Ids

in this approach, we store the order of the list into a none relational database. it causes to change the order of list become easy because we eliminate the limitation of the relational database. imagine you have a list of product ids contains 1,2,3,4,5,6 you can save different order of them such a form:

"4,2,1,3,5,6"

every time you want to change or read the products list you need to deserialize this data. you can serialize the ordered product as XML, JSON, or any mechanism you are able to serialize and deserialize a list.

this approach takes a lot of resources both memory and processor for a large list because you must process, serialize and deserialize lists in the application memory and application processor. but should be mentioned that this method could be a good choice for small lists.

* *Change(inefficient)*
* *Read(inefficient)*

### 3. Rank Field

In this approach, you are saving the position of the item based on the order. The ID of the item never changes, but you can update the index to match the order that you want. the complex part of this approach is in the index update algorithm. so change the order of the list could be inefficient instead retrieve the list is so performant for the relational database.

* *Change(inefficient)*
* *Read(efficient)*

there are a variety of methods to update the order index, for example, I can name these methods:

1. leave a “gap” between the indexes
2. Use decimal index and use float part of the index
3. Regenerate the order field after any change.
4. Get Order numbers directly from the client.
5. USe Fraction Algorithm to generate indexes.

I suggest studying the following article regarding the True Fractions algorithm.

[User-defined Order in SQL](https://begriffs.com/posts/2018-03-20-user-defined-order.html).

I have used the Fraction Algorithm in my projects and  I have implemented an example of the Rank Field approach by Fraction Algorithm. I have used the EF Core and InMemory Database in this code sample. I recommend you take a look at this code sample in following link:

[Rank Field By Fraction Algorithm](https://dotnetfiddle.net/Myhoap)