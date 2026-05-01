class AddMetadataToPickOptions < ActiveRecord::Migration[8.0]
  def change
    add_column :pick_options, :crest, :string
    add_column :pick_options, :football_data_id, :integer
  end
end
