import { Component, OnInit } from '@angular/core';
import { Customer } from '../app-model/customer';
import { CustomerService } from '../customer.service';
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'app-view-order',
  templateUrl: './view-order.component.html',
  styleUrls: ['./view-order.component.css']
})
export class ViewOrderComponent implements OnInit {
  customerId;
  order:Array<any> = new Array<any>();
  orderItem:Array<any> = new Array<any>();
  shippingAddress: String;
  amount:number;
  constructor(private service:CustomerService) { }

  ngOnInit(): void {
    this.customerId = Number(localStorage.getItem('customerId'));
    this.service.fetchOrder(this.customerId).subscribe(
      response=> {
        //console.log(response.orderId);

        console.log(response);
        this.shippingAddress=response[0].shippingAddress;
        console.log(this.shippingAddress);
        this.amount=response.amount;
        console.log(this.amount);
        this.order = response;
      }
    )
  }

  generatePDF(action = 'open', order) {
    console.log(order);
    let docDefinition = {
      content: [
        {
          text: 'CakeShop',
          fontSize: 20,
          fontFeatures: 'Roboto-Slab',
          alignment: 'center',
          color: '#008080'
        },
        {
          text: 'INVOICE',
          fontSize: 16,
          bold: true,
          alignment: 'center',
          decoration: 'underline',
          color: 'black'
        },
        {
          text: 'Customer Details',
          style: 'sectionHeader'
        },
        {
          columns: [
            [
              {
                text: order.customer.name,
                bold:true
              },
              { text: order.shippingAddress },
              { text: order.customer.email },
              { text: '8976543210' }
            ],
            [
              {
                text: `Date: ${order.shippingDate}`,
                alignment: 'right'
              },
              { 
                text: `Order Id : #${order.orderId}`,
                alignment: 'right',
                bold:true
              }
            ]
          ]
        },
        {
          text: 'Order Details',
          style: 'sectionHeader'
        },
        {
          table: {
            headerRows: 1,
            widths: ['*', 'auto', 'auto', 'auto'],
            body: [
              ['Product', 'Price', 'Quantity', 'Amount'],
              ...order.orderItem.map(p => ([p.product.name, p.product.unitPrice, p.quantity, p.price])),
              // ...this.invoice.products.map(p => ([p.name, p.price, p.qty, (p.price*p.qty).toFixed(2)])),
              [{text: 'Total Amount', colSpan: 3}, {}, {},order.amount]
            ]
          }
        },
        {
          text: 'Additional Details',
          style: 'sectionHeader'
        },
        {
          text: `Order Status: ${order.orderStatus}`,
          margin: [0, -10 ,0, 15]          
        },
        {
          text: `Arrived On: ${order.shippingDate}`,
          margin: [0, -10 ,0, 15]          
        },
        {
          text: `Time Slot: ${order.timeslot}`,
          margin: [0, -10 ,0, 15]          
        },
          {
          columns: [
            [{ qr: `Customer Name`, fit: '50' }],
            [{ text: 'Signature', alignment: 'right', italics: true}],
          ]
        },
        {
          text: 'Terms and Conditions',
          style: 'sectionHeader'
        },
        {
            ul: [
              'Order once delivered cannot be returned',
              'This is system generated invoice.',
            ],
        },
        {
          text: 'Thank you for shopping with us!',
          style: 'sectionHeader',
          alignment: 'center'
        }
      ],
      styles: {
        sectionHeader: {
          bold: true,
          decoration: 'underline',
          fontSize: 14,
          margin: [0, 15,0, 15]          
        }
      }
    };

    if(action==='download'){
      pdfMake.createPdf(docDefinition).download();
    }else if(action === 'print'){
      pdfMake.createPdf(docDefinition).print();      
    }else{
      pdfMake.createPdf(docDefinition).open();      
    }

  }  

}
