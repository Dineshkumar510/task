import { Component } from '@angular/core';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent {
  anyContentVisible: boolean = false;
  selectedRows: any[] = []; // Store selected rows from all project cards
  isModalVisible: boolean = false; // To control modal visibility


  openModal() {
    this.isModalVisible = true;
  }

  closeModal() {
    this.isModalVisible = false;
  }

  confirmDelete() {
    // Handle the delete action here
    console.log('Delete confirmed');
    this.closeModal();
  }

  onContentVisibilityChange(isVisible: boolean) {
    this.anyContentVisible = isVisible;
  }

  onSelectedRowsChange(selectedRows: any[]) {
    this.selectedRows = selectedRows;
  }

  deleteSelectedRows() {
    this.selectedRows.forEach(row => {
      const index = this.selectedRows.indexOf(row);
      if (index > -1) {
        this.selectedRows.splice(index, 1);
      }
    });

    localStorage.setItem('selectedRows', JSON.stringify(this.selectedRows));
    this.selectedRows = [];
    window.location.reload();
  }

}
