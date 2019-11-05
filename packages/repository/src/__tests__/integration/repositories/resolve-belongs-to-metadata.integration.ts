// Copyright IBM Corp. 2019. All Rights Reserved.
// Node module: @loopback/repository
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT

import {expect} from '@loopback/testlab';
import {
  BelongsToDefinition,
  Entity,
  ModelDefinition,
  RelationType,
} from '../../..';
import {resolveBelongsToMetadata} from '../../../relations/belongs-to/belongs-to.helpers';

describe('resolveBelongsToMetadata', () => {
  it('throws if the wrong metadata type is used', async () => {
    let error;

    try {
      resolveBelongsToMetadata(Category.definition.relations[
        'category'
      ] as BelongsToDefinition);
    } catch (err) {
      error = err;
    }

    expect(error.message).to.eql(
      'Invalid hasOne definition for Category#category: relation type must be BelongsTo',
    );
    expect(error.code).to.eql('INVALID_RELATION_DEFINITION');
  });

  /******  HELPERS *******/
  class Category extends Entity {}

  Category.definition = new ModelDefinition('Category')
    .addProperty('id', {type: 'number', id: true, required: true})
    // need <unknown> to avoid Type 'RelationType.hasOne' is not comparable
    // to type 'RelationType.belongsTo'
    .addRelation(<BelongsToDefinition>(<unknown>{
      name: 'category',
      type: RelationType.hasOne,
      targetsMany: false,
      source: Category,
      keyFrom: 'id',
      target: () => Category,
      keyTo: 'categoryId',
    }));
});
