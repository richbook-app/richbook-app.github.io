

It seems farfetched to be a Back-end developer and hear nothing about Domain-Driven Design(DDD). It seems that the role of DDD as a buzzword is bolder than a practical approach in software design among software developers.

Anyway, everyone is talking about it, isn’t a good reason to use that(Of course, this is not a good reason to learn anything)

Personally, before I learn a new approach or tool, I ask myself how I used to do it without the new method. What is wrong with the previous method and how will the new method solve this problem?

The same is true for DDD, The fact is that DDD does not work like magic. It just is an alternative to our previous approach in a three-layer design. An approach that looks at software only from the angle of storing and retrieving information. In this approach, the software logic is merely a combination of CRUD operations.

At the end of this article, we want to know what problem DDD is going to solve and in other words, what kind of projects is it reasonable to use?

DDD wants to change the focus of the programing from storing and retrieving information to a layer called Domain. This attitude has its costs and benefits in software development and is not going to magically solve all our problems.

To understand exactly what DDD solves, we need to look at three-tier architecture.

### What is our traditional approach to software design?

We as a software developer, as soon as receiving software requirements from Domain Experts (eg warehouse management domain) transform them into a bunch of storing and retrieving operations. And our program is usually a combination of these storing and retrieving operations called CRUDs.

This method is very simple and efficient as long as the logic of our software limited to storing and retrieving information with the least possible change in it.

But imagine a situation where, for example, changing one field in a table changes several other fields in other tables, and then a web service is called from another application.

For example, consider a warehouse management system. With the exit of a product from the warehouse, several information records must be changed in addition to the product record itself.

We know that the placement of such logic is neither in the UI layer nor in the Data Access layer. The only option is to put them in the Business Logic layer. But as the number of such requirements increases, what happens is that the logic of our program is scattered and sloppy Throughout the code in the form of storing and retrieving operations. Operations that have no meaning outside the world of programming. This causes that:
1.  The code readability comes down
2.  Duplicate codes increase
3.  Understanding software functionality becomes very complex
4.  Test, debugging and  maintenance of the software is costly

In such cases, the solution is to centralize the main logic of the software as much as possible on a single point. centralizing Business Logic as much as possible is a problem that DDD is going to solve(Of course, I looked at DDD from the perspective of a software developer, not a project manager or any other organizational role).
			

### What is the DDD solution for centralizing Software Logic? 

DDD generally emphasizes focusing application logic as much as possible on a range of models rather than on Business Logic layer functions(How to design a domain layer and how to connect it to other layers is an issue that needs to be addressed separately ).

[![image](/images/layered-application.png)](/images/layered-application.png)

Models will always keep themself in a valid situation through Object-Oriented paradigms, especially by observing Encapsulation. Regardless of where these changes originate from, A change in one model can cause a sequence of changes in other domain models as well. But the integrity and accuracy of the models will be maintained.

In designing this range of models, the concerns of how to store and retrieve information and how to interact with the user are not considered and more emphasis is placed on implementing the requirements of the business domain.

The Domain layer often comes into play for the Create, Update and Delete operations (which change the state of the system) and usually does not provide any special added value in the Read and querying data.

There is another important point about the domain layer. And that is all models and how they relate to each other are expressed in a comprehensible and non-technical language. So for those who are involved with it, including developers, analysts, and domain experts, it is quite understandable. In simple words, the model name (or class name), its behaviors, events, and properties make perfect sense to domain experts.

This helps all of these people to have a common view of the core of the software, regardless of their technical issues.

Unlike the previous method, where no one understood anything from the Business Logic layer except the developer.

This transparency in the logic of the software also increases the power of problem-solving in a desirable way.

Therefore, a layer called Domain, which will be the innermost layer of the software will be added to our architecture.

[![image](/images/ddd-layers.png)](/images/layered-application.png)

This layer will be the heart of our software. And any change in the logic of the software logic starts from there. Other parts of the software, such as the user interface (UI) or persistency (Repository) are in the service of the Domain. The user interface section transmits user requests to the domain. And the Data Access section is responsible for the domain persistency.